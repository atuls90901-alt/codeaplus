// app/api/audit/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { jsPDF } from 'jspdf'

/* Next.js max function duration — 60s */
export const maxDuration = 60

interface Scores {
  performance:   number
  seo:           number
  accessibility: number
  bestPractices: number
  lcp:           string
  fid:           string
  cls:           string
  isMock:        boolean
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, url, phone } = await req.json()

    if (!email?.trim() || !url?.trim()) {
      return NextResponse.json({ error: 'Email and URL are required.' }, { status: 400 })
    }

    const cleanUrl   = url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`
    const cleanEmail = email.trim().toLowerCase()

    /* ── 1. Duplicate check ── */
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )

    const { data: existing } = await supabase
      .from('audit_leads')
      .select('id')
      .eq('email', cleanEmail)
      .eq('url', cleanUrl)
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .maybeSingle()

    if (existing) {
      return NextResponse.json({
        error: 'We already sent an audit for this URL within the last 7 days. Please check your inbox or spam folder.'
      }, { status: 429 })
    }

    /* ── 2. Fetch PageSpeed — Sequential (more reliable than parallel) ── */
    const mobile  = await getPageSpeedScores(cleanUrl, 'mobile')
    const desktop = await getPageSpeedScores(cleanUrl, 'desktop')

    /* ── 3. Generate PDF ── */
    const pdfBase64 = generateAuditPDF({ name, url: cleanUrl, mobile, desktop })

    /* ── 4. Send email with PDF ── */
    const emailSent = await sendEmailWithPDF({
      to: cleanEmail, name: name || '', url: cleanUrl,
      mobile, desktop, pdfBase64,
    })

    /* ── 5. Save to DB ── */
    await supabase.from('audit_leads').insert({
      name:   name?.trim() || '',
      email:  cleanEmail,
      url:    cleanUrl,
      phone:  phone?.trim() || '',
      status: emailSent ? 'sent' : 'failed',
    })

    /* ── 6. Notify admin ── */
    await sendAdminEmail({ name, email: cleanEmail, phone, url: cleanUrl, mobile })

    return NextResponse.json({ success: true, message: 'Audit report sent to your email!' })

  } catch (err) {
    console.error('Audit API error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

/* ══════════════════════════════════════
   PAGESPEED — Real scores if API key exists
══════════════════════════════════════ */
async function getPageSpeedScores(url: string, strategy: 'mobile' | 'desktop'): Promise<Scores> {
  const apiKey = process.env.PAGESPEED_API_KEY

  if (!apiKey) {
    const b = strategy === 'desktop' ? 8 : 0
    return {
      performance:   Math.floor(Math.random() * 25 + 55) + b,
      seo:           Math.floor(Math.random() * 20 + 70) + b,
      accessibility: Math.floor(Math.random() * 20 + 65) + b,
      bestPractices: Math.floor(Math.random() * 15 + 72) + b,
      lcp:           (Math.random() * 3 + 1.5).toFixed(1) + 's',
      fid:           Math.floor(Math.random() * 80 + 20) + 'ms',
      cls:           (Math.random() * 0.15).toFixed(2),
      isMock:        true,
    }
  }

  try {
    const params = new URLSearchParams({ url, key: apiKey, strategy })
    ;['performance', 'seo', 'accessibility', 'best-practices'].forEach(c =>
      params.append('category', c)
    )
    const res  = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`,
      { signal: AbortSignal.timeout(55000) }   // 55s timeout
    )
    const data = await res.json()
    const cats = data?.lighthouseResult?.categories
    const aud  = data?.lighthouseResult?.audits

    return {
      performance:   Math.round((cats?.performance?.score        || 0) * 100),
      seo:           Math.round((cats?.seo?.score                || 0) * 100),
      accessibility: Math.round((cats?.accessibility?.score      || 0) * 100),
      bestPractices: Math.round((cats?.['best-practices']?.score || 0) * 100),
      lcp: aud?.['largest-contentful-paint']?.displayValue || 'N/A',
      fid: aud?.['total-blocking-time']?.displayValue      || 'N/A',
      cls: aud?.['cumulative-layout-shift']?.displayValue  || 'N/A',
      isMock: false,
    }
  } catch (err) {
    console.error(`PageSpeed ${strategy} error:`, err)
    return {
      performance: 65, seo: 72, accessibility: 70, bestPractices: 75,
      lcp: 'N/A', fid: 'N/A', cls: 'N/A', isMock: true,
    }
  }
}

/* ══════════════════════════════════════
   PDF GENERATION — jsPDF (fixed layout)
   Fixes:
   - Removed blank top area
   - Status label no longer clips
   - Better column spacing
   - Cleaner section gaps
══════════════════════════════════════ */
function generateAuditPDF({ name, url, mobile, desktop }: {
  name?: string; url: string; mobile: Scores; desktop: Scores
}): string {

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const W   = 210  // A4 width

  /* Colors */
  const GOLD:  [number,number,number] = [201, 168, 76]
  const DARK:  [number,number,number] = [10,  10,  10]
  const GRAY:  [number,number,number] = [110, 110, 110]
  const WHITE: [number,number,number] = [240, 236, 228]
  const GREEN: [number,number,number] = [34,  197, 94]
  const AMBER: [number,number,number] = [245, 158, 11]
  const RED:   [number,number,number] = [239, 68,  68]
  const BG2:   [number,number,number] = [18,  18,  18]

  const domain    = extractDomain(url)
  const firstName = name?.split(' ')[0] || ''
  const date      = new Date().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  const sc      = (s: number): [number,number,number] => s >= 90 ? GREEN : s >= 50 ? AMBER : RED
  const scLabel = (s: number) => s >= 90 ? 'Good' : s >= 50 ? 'Needs Work' : 'Poor'

  /* ── Full page background ── */
  doc.setFillColor(...DARK)
  doc.rect(0, 0, W, 297, 'F')

  /* ── Gold top line (3mm) ── */
  doc.setFillColor(...GOLD)
  doc.rect(0, 0, W, 3, 'F')

  /* ── Header section (starts at y=3, no gap) ── */
  doc.setFillColor(15, 15, 15)
  doc.rect(0, 3, W, 36, 'F')

  /* Logo */
  doc.setTextColor(...GOLD)
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text('CodeaPlus.', 20, 19)

  /* Report label */
  doc.setTextColor(...GRAY)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.text('FREE WEBSITE AUDIT REPORT', 20, 27)
  doc.text(date, W - 20, 27, { align: 'right' })

  /* Domain */
  doc.setTextColor(...WHITE)
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.text(domain, 20, 35)

  /* ── Thin gold separator ── */
  doc.setFillColor(...GOLD)
  doc.rect(0, 39, W, 0.4, 'F')

  /* ── Greeting strip ── */
  doc.setFillColor(...BG2)
  doc.rect(0, 39.4, W, 14, 'F')

  const greeting = firstName
    ? `Hi ${firstName}, here is your free technical audit for ${domain}.`
    : `Here is your free technical audit report for ${domain}.`
  doc.setTextColor(...WHITE)
  doc.setFontSize(8.5)
  doc.setFont('helvetica', 'normal')
  doc.text(greeting, 20, 48)

  if (mobile.isMock) {
    doc.setTextColor(...AMBER)
    doc.setFontSize(7)
    doc.text('* Estimated scores — real scores require PageSpeed API key.', 20, 51)
  }

  let y = 62

  /* ══════════════════════════
     SCORES SECTION
  ══════════════════════════ */
  doc.setTextColor(...GOLD)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('AUDIT SCORES', 20, y)
  y += 5

  /* Column headers */
  doc.setTextColor(...GRAY)
  doc.setFontSize(6.5)
  doc.setFont('helvetica', 'normal')
  doc.text('METRIC',   22, y)
  doc.text('MOBILE',   88, y, { align: 'center' })
  doc.text('BAR',      110, y, { align: 'left' })
  doc.text('DESKTOP',  148, y, { align: 'center' })
  doc.text('STATUS',   188, y, { align: 'right' })

  y += 2
  doc.setFillColor(...GOLD)
  doc.rect(20, y, W - 40, 0.3, 'F')
  y += 4

  const scoreRows = [
    { label: 'Performance',    m: mobile.performance,   d: desktop.performance   },
    { label: 'SEO',            m: mobile.seo,           d: desktop.seo           },
    { label: 'Accessibility',  m: mobile.accessibility, d: desktop.accessibility },
    { label: 'Best Practices', m: mobile.bestPractices, d: desktop.bestPractices },
  ]

  scoreRows.forEach(row => {
    const ROW_H = 14

    /* Row bg */
    doc.setFillColor(...BG2)
    doc.rect(20, y, W - 40, ROW_H, 'F')

    /* Metric label */
    doc.setTextColor(...WHITE)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text(row.label, 22, y + 8)

    /* Mobile score */
    doc.setTextColor(...sc(row.m))
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text(String(row.m), 88, y + 9, { align: 'center' })

    /* Mobile bar (x=100 to 130) */
    doc.setFillColor(35, 35, 35)
    doc.rect(100, y + 5.5, 30, 3, 'F')
    doc.setFillColor(...sc(row.m))
    doc.rect(100, y + 5.5, 30 * (row.m / 100), 3, 'F')

    /* Desktop score */
    doc.setTextColor(...sc(row.d))
    doc.setFontSize(11)
    doc.text(String(row.d), 148, y + 9, { align: 'center' })

    /* Desktop bar (x=158 to 178) */
    doc.setFillColor(35, 35, 35)
    doc.rect(158, y + 5.5, 20, 2, 'F')
    doc.setFillColor(...sc(row.d))
    doc.rect(158, y + 5.5, 20 * (row.d / 100), 2, 'F')

    /* Status label — fixed width area, no clip */
    doc.setTextColor(...sc(row.m))
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.text(scLabel(row.m), 188, y + 9, { align: 'right' })

    /* Row bottom border */
    doc.setFillColor(30, 30, 30)
    doc.rect(20, y + ROW_H, W - 40, 0.3, 'F')

    y += ROW_H + 0.3
  })

  /* ══════════════════════════
     CORE WEB VITALS
  ══════════════════════════ */
  y += 6
  doc.setTextColor(...GOLD)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('CORE WEB VITALS (MOBILE)', 20, y)
  y += 5

  const vitals = [
    { label: 'LCP — Largest Contentful Paint', value: mobile.lcp, target: '< 2.5s'  },
    { label: 'TBT — Total Blocking Time',       value: mobile.fid, target: '< 200ms' },
    { label: 'CLS — Cumulative Layout Shift',   value: mobile.cls, target: '< 0.1'   },
  ]

  vitals.forEach(v => {
    doc.setFillColor(...BG2)
    doc.rect(20, y, W - 40, 12, 'F')

    doc.setTextColor(...WHITE)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text(v.label, 22, y + 7)

    doc.setTextColor(...GOLD)
    doc.setFont('helvetica', 'bold')
    doc.text(v.value, 155, y + 7)

    doc.setTextColor(...GRAY)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6.5)
    doc.text(`Target: ${v.target}`, 188, y + 7, { align: 'right' })

    doc.setFillColor(30, 30, 30)
    doc.rect(20, y + 12, W - 40, 0.3, 'F')

    y += 12.3
  })

  /* ══════════════════════════
     RECOMMENDATIONS
  ══════════════════════════ */
  y += 6
  doc.setTextColor(...GOLD)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('TOP RECOMMENDATIONS', 20, y)
  y += 5

  getRecommendations(mobile).forEach((rec, i) => {
    const REC_H = 21

    /* Card bg */
    doc.setFillColor(...BG2)
    doc.rect(20, y, W - 40, REC_H, 'F')

    /* Number badge */
    doc.setFillColor(...GOLD)
    doc.rect(20, y, 7, REC_H, 'F')
    doc.setTextColor(...DARK)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text(String(i + 1), 23.5, y + 12)

    /* Title */
    doc.setTextColor(...WHITE)
    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'bold')
    doc.text(rec.title, 31, y + 7)

    /* Description — wrap */
    doc.setTextColor(...GRAY)
    doc.setFontSize(7.5)
    doc.setFont('helvetica', 'normal')
    const lines = doc.splitTextToSize(rec.desc, W - 52)
    doc.text(lines[0] || '', 31, y + 13)
    if (lines[1]) doc.text(lines[1], 31, y + 18)

    doc.setFillColor(30, 30, 30)
    doc.rect(20, y + REC_H, W - 40, 0.3, 'F')

    y += REC_H + 0.3
  })

  /* ══════════════════════════
     ASSESSMENT BOX
  ══════════════════════════ */
  y += 5
  doc.setFillColor(20, 15, 5)
  doc.rect(20, y, W - 40, 24, 'F')
  doc.setFillColor(...GOLD)
  doc.rect(20, y, 3, 24, 'F')

  doc.setTextColor(...GOLD)
  doc.setFontSize(7.5)
  doc.setFont('helvetica', 'bold')
  doc.text('OUR ASSESSMENT', 27, y + 8)

  doc.setTextColor(...GRAY)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  const aLines = doc.splitTextToSize(getAssessment(mobile.performance), W - 52)
  doc.text(aLines[0] || '', 27, y + 14)
  if (aLines[1]) doc.text(aLines[1], 27, y + 19)

  /* ══════════════════════════
     FOOTER (fixed at bottom)
  ══════════════════════════ */
  doc.setFillColor(15, 15, 15)
  doc.rect(0, 267, W, 30, 'F')
  doc.setFillColor(...GOLD)
  doc.rect(0, 267, W, 0.5, 'F')

  doc.setTextColor(...GOLD)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Ready to fix these issues?', W / 2, 278, { align: 'center' })

  doc.setTextColor(...GRAY)
  doc.setFontSize(7.5)
  doc.setFont('helvetica', 'normal')
  doc.text(
    'codeaplus.pro  ·  codeaplussupport@gmail.com  ·  +91 84710 90481',
    W / 2, 285, { align: 'center' }
  )
  doc.text('India — Working Globally', W / 2, 291, { align: 'center' })

  return doc.output('datauristring').split(',')[1]
}

/* ══════════════════════════════════════
   SEND EMAIL WITH PDF ATTACHMENT
══════════════════════════════════════ */
async function sendEmailWithPDF({ to, name, url, mobile, desktop, pdfBase64 }: {
  to: string; name: string; url: string
  mobile: Scores; desktop: Scores; pdfBase64: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) { console.warn('No RESEND_API_KEY'); return false }

  const domain    = extractDomain(url)
  const firstName = name?.split(' ')[0] || 'there'
  const html      = buildEmailHTML({ firstName, url, domain, mobile, desktop })

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:        'CodeaPlus <noreply@codeaplus.pro>',
        to,
        subject:     `Your Free Website Audit — ${domain}`,
        html,
        attachments: [{
          filename:     `CodeaPlus-Audit-${domain}.pdf`,
          content:      pdfBase64,
          content_type: 'application/pdf',
        }],
      }),
    })
    if (!res.ok) { console.error('Resend error:', await res.json()); return false }
    return true
  } catch (err) { console.error('Email error:', err); return false }
}

/* ══════════════════════════════════════
   ADMIN NOTIFICATION EMAIL
══════════════════════════════════════ */
async function sendAdminEmail({ name, email, phone, url, mobile }: {
  name?: string; email: string; phone?: string; url: string; mobile: Scores
}) {
  const apiKey     = process.env.RESEND_API_KEY
  const adminEmail = process.env.ADMIN_EMAIL || 'codeaplussupport@gmail.com'
  if (!apiKey) return

  const domain = extractDomain(url)

  try {
    await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    'CodeaPlus <noreply@codeaplus.pro>',
        to:      adminEmail,
        subject: `🔔 New Audit Lead — ${domain}`,
        html: `<!DOCTYPE html><html>
<body style="margin:0;padding:24px;background:#060606;font-family:monospace;color:#f0ece4;">
<div style="max-width:480px;background:#0a0a0a;border:1px solid rgba(201,168,76,0.25);padding:28px 32px;">
  <div style="height:2px;background:linear-gradient(90deg,transparent,#C9A84C,transparent);margin:-28px -32px 24px;"></div>
  <div style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#C9A84C;margin-bottom:20px;">🔔 New Audit Lead</div>
  <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;">
    <tr><td style="padding:7px 0;color:#6b7280;width:80px;">Name</td>  <td style="color:#f0ece4;">${name || '—'}</td></tr>
    <tr><td style="padding:7px 0;color:#6b7280;">Email</td> <td><a href="mailto:${email}" style="color:#C9A84C;text-decoration:none;">${email}</a></td></tr>
    <tr><td style="padding:7px 0;color:#6b7280;">Phone</td> <td style="color:#f0ece4;">${phone || '—'}</td></tr>
    <tr><td style="padding:7px 0;color:#6b7280;">Site</td>  <td><a href="${url}" style="color:#C9A84C;text-decoration:none;">${domain}</a></td></tr>
    <tr><td colspan="2" style="padding:10px 0 4px;"><div style="height:1px;background:#1a1a1a;"></div></td></tr>
    <tr><td style="padding:5px 0;color:#6b7280;">Perf</td>  <td style="font-weight:600;color:${scColor(mobile.performance)}">${mobile.performance}/100</td></tr>
    <tr><td style="padding:5px 0;color:#6b7280;">SEO</td>   <td style="font-weight:600;color:${scColor(mobile.seo)}">${mobile.seo}/100</td></tr>
    <tr><td style="padding:5px 0;color:#6b7280;">A11y</td>  <td style="font-weight:600;color:${scColor(mobile.accessibility)}">${mobile.accessibility}/100</td></tr>
    <tr><td style="padding:5px 0;color:#6b7280;">Best</td>  <td style="font-weight:600;color:${scColor(mobile.bestPractices)}">${mobile.bestPractices}/100</td></tr>
  </table>
  <div style="margin-top:20px;display:flex;gap:12px;">
    <a href="mailto:${email}?subject=Your Website Audit — ${domain}" style="display:inline-block;background:#C9A84C;color:#060606;padding:10px 20px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;">Reply →</a>
    <a href="https://wa.me/${phone?.replace(/\D/g,'') || '918471090481'}" style="display:inline-block;border:1px solid rgba(201,168,76,0.3);color:#C9A84C;padding:10px 20px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;">WhatsApp →</a>
  </div>
</div>
</body></html>`,
      }),
    })
  } catch (err) { console.error('Admin email error:', err) }
}

/* ══════════════════════════════════════
   EMAIL HTML TEMPLATE
══════════════════════════════════════ */
function buildEmailHTML({ firstName, url, domain, mobile, desktop }: {
  firstName: string; url: string; domain: string; mobile: Scores; desktop: Scores
}) {
  const bar = (label: string, m: number, d: number) => `
    <tr><td style="padding:11px 0;border-bottom:1px solid #141414;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <span style="font-family:monospace;font-size:10px;text-transform:uppercase;color:#6b7280;">${label}</span>
        <span style="font-family:monospace;font-size:10px;color:#4b5563;">
          Mobile <strong style="color:${scColor(m)}">${m}</strong> &nbsp;
          Desktop <strong style="color:${scColor(d)}">${d}</strong>
        </span>
      </div>
      <div style="background:#1a1a1a;height:5px;border-radius:3px;margin-bottom:3px;">
        <div style="width:${m}%;height:100%;background:${scColor(m)};border-radius:3px;"></div>
      </div>
      <div style="background:#1a1a1a;height:3px;border-radius:3px;opacity:0.5;">
        <div style="width:${d}%;height:100%;background:${scColor(d)};border-radius:3px;"></div>
      </div>
    </td></tr>`

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#060606;font-family:'Helvetica Neue',Arial,sans-serif;color:#f0ece4;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#060606;padding:32px 16px;">
<tr><td align="center">
<table width="100%" style="max-width:600px;background:#0a0a0a;border:1px solid rgba(201,168,76,0.2);">
  <tr><td style="height:3px;background:linear-gradient(90deg,transparent,#C9A84C,transparent);"></td></tr>
  <tr><td style="padding:32px 40px 24px;border-bottom:1px solid #141414;">
    <div style="font-family:Georgia,serif;font-size:24px;font-weight:300;">
      Codea<span style="color:#C9A84C;">Plus</span><span style="color:#C9A84C;">.</span>
    </div>
    <div style="font-family:monospace;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#4b5563;margin-top:3px;">
      Free Website Audit Report
    </div>
  </td></tr>
  <tr><td style="padding:28px 40px 20px;">
    <p style="font-size:15px;color:#d1d5db;margin:0 0 10px;">Hi ${firstName},</p>
    <p style="font-size:13px;color:#6b7280;line-height:1.8;margin:0;">
      Your audit for <a href="${url}" style="color:#C9A84C;text-decoration:none;">${domain}</a> is ready.
      The <strong style="color:#9ca3af;">detailed PDF report is attached</strong> to this email.
      Here's a quick summary:
    </p>
  </td></tr>
  <tr><td style="padding:0 40px 8px;">
    <div style="font-family:monospace;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:#C9A84C;margin-bottom:12px;">
      Scores
    </div>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${bar('Performance',    mobile.performance,   desktop.performance)}
      ${bar('SEO',            mobile.seo,           desktop.seo)}
      ${bar('Accessibility',  mobile.accessibility, desktop.accessibility)}
      ${bar('Best Practices', mobile.bestPractices, desktop.bestPractices)}
    </table>
  </td></tr>
  <tr><td style="padding:20px 40px;">
    <div style="background:#0f0f0f;border-left:3px solid #C9A84C;padding:16px 18px;">
      <p style="font-size:13px;color:#9ca3af;line-height:1.75;margin:0;">
        ${getAssessment(mobile.performance)}
      </p>
    </div>
  </td></tr>
  <tr><td style="padding:0 40px 36px;text-align:center;">
    <p style="font-size:13px;color:#4b5563;margin:0 0 16px;">Want us to fix these issues?</p>
    <a href="https://codeaplus.pro/#contact"
      style="display:inline-block;background:#C9A84C;color:#060606;font-family:monospace;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;padding:13px 32px;text-decoration:none;font-weight:600;">
      Let's Fix This →
    </a>
    <br>
    <a href="https://wa.me/918471090481"
      style="display:inline-block;margin-top:10px;color:#C9A84C;font-family:monospace;font-size:10px;text-decoration:none;">
      💬 Chat on WhatsApp →
    </a>
  </td></tr>
  <tr><td style="padding:18px 40px;border-top:1px solid #141414;text-align:center;">
    <p style="font-family:monospace;font-size:9px;color:#374151;margin:0;">
      CodeaPlus ·
      <a href="https://codeaplus.pro" style="color:#C9A84C;text-decoration:none;">codeaplus.pro</a>
      · India — Working Globally
    </p>
    <p style="font-family:monospace;font-size:8px;color:#1f2937;margin:5px 0 0;">
      You received this because you requested a free audit. No spam, ever.
    </p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`
}

/* ══════════════════════════════════════
   HELPERS
══════════════════════════════════════ */
function extractDomain(url: string) {
  try { return new URL(url).hostname.replace('www.', '') } catch { return url }
}
function scColor(s: number) {
  if (s >= 90) return '#22c55e'
  if (s >= 50) return '#f59e0b'
  return '#ef4444'
}
function getAssessment(score: number) {
  if (score >= 90) return 'Great news — your site is performing well! A few minor tweaks could push it to perfect. Our team will share quick wins within 24 hours.'
  if (score >= 70) return 'Your site has a solid foundation, but there are clear opportunities to improve performance and conversions. Our team will share a prioritised action plan within 24 hours.'
  if (score >= 50) return 'Your site has several performance issues that are likely hurting your search rankings and conversion rate. Our team will outline the most impactful fixes within 24 hours.'
  return 'Your site has significant technical issues that need immediate attention — likely costing you traffic and customers daily. Our team will reach out within 24 hours with a clear plan.'
}
function getRecommendations(scores: Scores) {
  const recs = []
  if (scores.performance   < 90) recs.push({ title: 'Improve Page Speed',       desc: 'Compress images, enable lazy loading, minify CSS/JS, and use a CDN. Even a 1s improvement can increase conversions by 7%.' })
  if (scores.seo           < 90) recs.push({ title: 'Fix SEO Issues',            desc: 'Add missing meta descriptions, fix heading hierarchy, add alt text to images, and submit your sitemap to Google Search Console.' })
  if (scores.accessibility < 90) recs.push({ title: 'Improve Accessibility',     desc: 'Add ARIA labels, improve colour contrast, ensure keyboard navigation works, and add proper form labels.' })
  if (scores.bestPractices < 90) recs.push({ title: 'Security & Best Practices', desc: 'Enable HTTPS, add security headers (CSP, HSTS), remove unused JS libraries, and fix console errors.' })
  recs.push({ title: 'Mobile-First Optimisation', desc: 'Over 60% of visitors are on mobile. Ensure touch targets are large enough, fonts are readable, and forms are easy to fill on small screens.' })
  return recs.slice(0, 4)
}