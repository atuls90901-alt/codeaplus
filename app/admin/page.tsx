'use client'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Project, Testimonial, Contact } from '@/types'

type Tab = 'projects' | 'testimonials' | 'pending' | 'contacts'

const iCls = "w-full bg-bg-secondary border border-gold/10 focus:border-gold/50 text-white font-light text-[13px] px-4 py-2.5 outline-none transition-all placeholder:text-white/20"

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab]               = useState<Tab>('projects')
  const [projects, setProjects]     = useState<Project[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [pending, setPending]       = useState<Testimonial[]>([])
  const [contacts, setContacts]     = useState<Contact[]>([])
  const [loading, setLoading]       = useState(true)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showTestiForm, setShowTestiForm]     = useState(false)
  const [editProject, setEditProject] = useState<Project | null>(null)
  const [editTesti, setEditTesti]     = useState<Testimonial | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push('/admin/login')
      else fetchAll()
    })
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    const [p, t, pend, c] = await Promise.all([
      supabase.from('projects').select('*').order('display_order'),
      supabase.from('testimonials').select('*').eq('status', 'approved').order('display_order'),
      supabase.from('testimonials').select('*').eq('status', 'pending').order('created_at', { ascending: false }),
      supabase.from('contacts').select('*').order('created_at', { ascending: false }),
    ])
    setProjects(p.data || [])
    setTestimonials(t.data || [])
    setPending(pend.data || [])
    setContacts(c.data || [])
    setLoading(false)
  }

  const logout       = async () => { await supabase.auth.signOut(); router.push('/admin/login') }
  const deleteProject  = async (id: string) => { await supabase.from('projects').delete().eq('id', id); fetchAll() }
  const deleteTesti    = async (id: string) => { await supabase.from('testimonials').delete().eq('id', id); fetchAll() }
  const markRead       = async (id: string) => { await supabase.from('contacts').update({ is_read: true }).eq('id', id); fetchAll() }
  const approveReview  = async (id: string) => { await supabase.from('testimonials').update({ status: 'approved', is_active: true }).eq('id', id); fetchAll() }
  const rejectReview   = async (id: string) => { await supabase.from('testimonials').update({ status: 'rejected' }).eq('id', id); fetchAll() }

  const tabs: { key: Tab; label: string; short: string; badge?: number }[] = [
    { key: 'projects',     label: 'Projects',        short: 'Projects' },
    { key: 'testimonials', label: 'Testimonials',    short: 'Reviews' },
    { key: 'pending',      label: 'Pending Reviews', short: 'Pending',  badge: pending.length },
    { key: 'contacts',     label: 'Contacts',        short: 'Contacts', badge: contacts.filter(c => !c.is_read).length },
  ]

  if (loading) return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="font-mono text-[11px] tracking-widest text-gold animate-pulse">Loading...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-bg-primary text-white font-outfit">

      {/* Header */}
      <div className="border-b border-gold/10 px-4 md:px-10 py-4 flex justify-between items-center bg-bg-secondary sticky top-0 z-50">
        <div className="font-cormorant text-xl md:text-2xl font-light">
          CodeaPlus<span className="text-gold">.</span>{' '}
          <span className="text-white/35 text-base md:text-lg">Admin</span>
        </div>
        <div className="flex gap-2">
          <a href="/" target="_blank" className="font-mono text-[9px] tracking-[.2em] uppercase text-white/40 hover:text-gold transition-colors border border-gold/10 hover:border-gold/30 px-3 md:px-4 py-2">Site ↗</a>
          <button onClick={logout} className="font-mono text-[9px] tracking-[.2em] uppercase text-white/40 hover:text-red-400 transition-colors border border-gold/10 px-3 md:px-4 py-2">Logout</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 px-4 md:px-10 pt-6 overflow-x-auto">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`font-mono text-[9px] md:text-[10px] tracking-[.15em] uppercase px-3 md:px-6 py-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap flex-shrink-0
              ${tab === t.key ? 'text-gold border-gold' : 'text-white/40 border-transparent hover:text-white/70 hover:border-gold/20'}`}>
            <span className="hidden sm:inline">{t.label}</span>
            <span className="sm:hidden">{t.short}</span>
            {!!t.badge && <span className="bg-gold text-bg-primary text-[8px] px-1.5 py-0.5 rounded-full font-bold leading-none">{t.badge}</span>}
          </button>
        ))}
      </div>
      <div className="h-px bg-gold/10 mx-4 md:mx-10" />

      <div className="p-4 md:p-10">

        {/* PROJECTS */}
        {tab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-cormorant text-xl md:text-2xl font-light">Projects <span className="text-white/30">({projects.length})</span></h2>
              <button onClick={() => { setEditProject(null); setShowProjectForm(true) }}
                className="font-mono text-[9px] md:text-[10px] tracking-[.15em] uppercase text-bg-primary bg-gold px-4 md:px-5 py-2 hover:opacity-85 transition-opacity">
                + Add Project
              </button>
            </div>

            {showProjectForm && (
              <ProjectForm initial={editProject}
                onSave={async (data) => {
                  if (editProject) await supabase.from('projects').update(data).eq('id', editProject.id)
                  else await supabase.from('projects').insert([data])
                  setShowProjectForm(false); setEditProject(null); fetchAll()
                }}
                onCancel={() => { setShowProjectForm(false); setEditProject(null) }} />
            )}

            <div className="flex flex-col gap-2">
              {projects.map(p => (
                <div key={p.id} className="flex items-center gap-3 md:gap-5 p-4 border border-gold/10 bg-bg-secondary hover:bg-surface transition-colors">
                  {/* Thumbnail */}
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.title} className="w-16 h-10 object-cover rounded flex-shrink-0 border border-gold/10" />
                  ) : (
                    <div className="w-16 h-10 rounded flex-shrink-0 border border-gold/10 flex items-center justify-center bg-surface">
                      <span className="text-white/20 text-[10px] font-mono">No img</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm md:text-[15px] truncate">{p.title}</div>
                    <div className="font-mono text-[9px] tracking-[.1em] uppercase text-gold mt-0.5">{p.category}</div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => { setEditProject(p); setShowProjectForm(true) }}
                      className="font-mono text-[9px] text-white/40 hover:text-gold border border-gold/10 hover:border-gold/30 px-2 md:px-3 py-1.5 transition-colors">Edit</button>
                    <button onClick={() => deleteProject(p.id)}
                      className="font-mono text-[9px] text-white/40 hover:text-red-400 border border-gold/10 px-2 md:px-3 py-1.5 transition-colors">Del</button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && <EmptyState text="No projects yet." />}
            </div>
          </div>
        )}

        {/* TESTIMONIALS */}
        {tab === 'testimonials' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-cormorant text-xl md:text-2xl font-light">Approved Testimonials <span className="text-white/30">({testimonials.length})</span></h2>
              <button onClick={() => { setEditTesti(null); setShowTestiForm(true) }}
                className="font-mono text-[9px] md:text-[10px] tracking-[.15em] uppercase text-bg-primary bg-gold px-4 md:px-5 py-2 hover:opacity-85 transition-opacity">+ Add</button>
            </div>
            {showTestiForm && (
              <TestimonialForm initial={editTesti}
                onSave={async (data) => {
                  if (editTesti) await supabase.from('testimonials').update(data).eq('id', editTesti.id)
                  else await supabase.from('testimonials').insert([{ ...data, status: 'approved', is_active: true }])
                  setShowTestiForm(false); setEditTesti(null); fetchAll()
                }}
                onCancel={() => { setShowTestiForm(false); setEditTesti(null) }} />
            )}
            <div className="flex flex-col gap-2">
              {testimonials.map(t => (
                <div key={t.id} className="flex items-start gap-3 md:gap-4 p-4 border border-gold/10 bg-bg-secondary hover:bg-surface transition-colors">
                  <Avatar letter={t.avatar_letter} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm md:text-[15px]">{t.author_name}</span>
                      <span className="text-gold text-[11px]">{'★'.repeat(t.rating)}</span>
                    </div>
                    <div className="font-mono text-[9px] tracking-[.1em] uppercase text-gold mt-0.5 mb-1">{t.author_role}</div>
                    <div className="text-xs md:text-[13px] text-white/50 font-light line-clamp-2">"{t.content}"</div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => { setEditTesti(t); setShowTestiForm(true) }} className="font-mono text-[9px] text-white/40 hover:text-gold border border-gold/10 px-2 py-1.5 transition-colors">Edit</button>
                    <button onClick={() => deleteTesti(t.id)} className="font-mono text-[9px] text-white/40 hover:text-red-400 border border-gold/10 px-2 py-1.5 transition-colors">Del</button>
                  </div>
                </div>
              ))}
              {testimonials.length === 0 && <EmptyState text="No approved testimonials." />}
            </div>
          </div>
        )}

        {/* PENDING */}
        {tab === 'pending' && (
          <div>
            <div className="mb-6">
              <h2 className="font-cormorant text-xl md:text-2xl font-light">Pending Reviews <span className="text-white/30">({pending.length})</span></h2>
              <p className="font-mono text-[10px] tracking-[.1em] uppercase text-white/30 mt-1">Approve or reject user-submitted reviews</p>
            </div>
            <div className="flex flex-col gap-3">
              {pending.map(t => (
                <div key={t.id} className="p-4 md:p-6 border border-gold/20 bg-gold/[0.03]">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar letter={t.avatar_letter} size="lg" />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm md:text-[15px]">{t.author_name}</span>
                          <span className="text-gold text-xs">{'★'.repeat(t.rating)}</span>
                        </div>
                        <div className="font-mono text-[9px] tracking-[.1em] uppercase text-gold mt-0.5">{t.author_role}</div>
                      </div>
                    </div>
                    <div className="font-mono text-[9px] text-white/30 flex-shrink-0">
                      {new Date(t.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                  <p className="text-sm md:text-[14px] text-white/70 font-light leading-[1.7] border-l-2 border-gold/20 pl-4 mb-4 italic">"{t.content}"</p>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => approveReview(t.id)} className="font-mono text-[9px] md:text-[10px] tracking-[.15em] uppercase text-bg-primary bg-gold px-5 md:px-6 py-2 hover:opacity-85 transition-opacity">✓ Approve</button>
                    <button onClick={() => rejectReview(t.id)} className="font-mono text-[9px] md:text-[10px] tracking-[.15em] uppercase text-white/40 hover:text-red-400 border border-gold/10 px-5 md:px-6 py-2 transition-colors">✕ Reject</button>
                  </div>
                </div>
              ))}
              {pending.length === 0 && (
                <div className="text-center py-20 border border-gold/10">
                  <div className="text-3xl mb-3 opacity-50">✓</div>
                  <div className="text-white/30 font-mono text-[11px] tracking-widest">All caught up!</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CONTACTS */}
        {tab === 'contacts' && (
          <div>
            <h2 className="font-cormorant text-xl md:text-2xl font-light mb-6">Contact Submissions <span className="text-white/30">({contacts.length})</span></h2>
            <div className="flex flex-col gap-2">
              {contacts.map(c => (
                <div key={c.id} className={`p-4 md:p-6 border transition-colors ${c.is_read ? 'border-gold/10 bg-bg-secondary' : 'border-gold/25 bg-gold/[0.03]'}`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm md:text-[15px]">{c.name}</span>
                        {!c.is_read && <span className="font-mono text-[8px] tracking-widest uppercase text-bg-primary bg-gold px-2 py-0.5">New</span>}
                      </div>
                      <div className="text-[13px] text-white/50 mt-0.5">{c.email}</div>
                    </div>
                    <div className="sm:text-right">
                      <div className="font-mono text-[9px] tracking-[.1em] uppercase text-gold">{c.service}</div>
                      <div className="font-mono text-[9px] tracking-[.1em] uppercase text-white/40 mt-1">{c.budget}</div>
                    </div>
                  </div>
                  {c.message && <p className="text-[13px] text-white/50 font-light leading-[1.7] border-t border-gold/10 pt-3">{c.message}</p>}
                  <div className="flex justify-between items-center mt-3">
                    <div className="font-mono text-[9px] text-white/30">
                      {new Date(c.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    {!c.is_read && (
                      <button onClick={() => markRead(c.id)} className="font-mono text-[9px] tracking-[.1em] uppercase text-white/40 hover:text-gold border border-gold/10 hover:border-gold/30 px-3 py-1.5 transition-colors">Mark Read</button>
                    )}
                  </div>
                </div>
              ))}
              {contacts.length === 0 && <EmptyState text="No contacts yet." />}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Shared ── */
function Avatar({ letter, size = 'sm' }: { letter: string; size?: 'sm' | 'lg' }) {
  return (
    <div className={`rounded-full flex items-center justify-center font-cormorant font-semibold flex-shrink-0 ${size === 'lg' ? 'w-10 h-10 md:w-11 md:h-11 text-base md:text-lg' : 'w-9 h-9 text-base'}`}
      style={{ background: 'linear-gradient(135deg,#7a6028,#C9A84C)', color: '#060606' }}>
      {letter}
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return <div className="text-center py-16 text-white/30 font-mono text-[11px] tracking-widest border border-gold/8">{text}</div>
}

/* ── Project Form with Image Upload ── */
function ProjectForm({ initial, onSave, onCancel }: { initial: Project | null; onSave: (d: any) => void; onCancel: () => void }) {
  const [data, setData] = useState({
    title:         initial?.title || '',
    category:      initial?.category || '',
    description:   initial?.description || '',
    tech_stack:    initial?.tech_stack?.join(', ') || '',
    gradient:      initial?.gradient || 'linear-gradient(135deg,#0a1628,#1a3a5c)',
    live_url:      initial?.live_url || '',
    image_url:     initial?.image_url || '',
    display_order: initial?.display_order || 0,
    is_featured:   initial?.is_featured || false,
  })
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview]     = useState<string>(initial?.image_url || '')
  const fileRef = useRef<HTMLInputElement>(null)

  const uploadImage = async (file: File) => {
    setUploading(true)
    try {
      const ext      = file.name.split('.').pop()
      const fileName = `project-${Date.now()}.${ext}`
      const { error } = await supabase.storage
        .from('projects')
        .upload(fileName, file, { upsert: true })

      if (error) throw error

      const { data: urlData } = supabase.storage
        .from('projects')
        .getPublicUrl(fileName)

      const url = urlData.publicUrl
      setData(d => ({ ...d, image_url: url }))
      setPreview(url)
    } catch (e: any) {
      alert('Upload failed: ' + e.message)
    } finally {
      setUploading(false)
    }
  }

  const fields = [
    { label: 'Title',         key: 'title',         ph: 'EzGrabs — E-Commerce Platform' },
    { label: 'Category',      key: 'category',      ph: 'E-Commerce · Next.js' },
    { label: 'Live URL',      key: 'live_url',      ph: 'https://ezgrabs.com' },
    { label: 'Display Order', key: 'display_order', ph: '1' },
  ]

  return (
    <div className="border border-gold/20 bg-bg-secondary p-5 md:p-7 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <h3 className="col-span-full font-cormorant text-xl font-light">{initial ? 'Edit' : 'Add'} Project</h3>

      {/* ── IMAGE UPLOAD ── */}
      <div className="col-span-full">
        <label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/40 block mb-2">
          Project Image
        </label>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          {/* Preview */}
          <div
            onClick={() => fileRef.current?.click()}
            className="w-full sm:w-48 h-28 border-2 border-dashed border-gold/20 hover:border-gold/50
              flex items-center justify-center cursor-pointer rounded transition-colors overflow-hidden
              bg-surface relative group flex-shrink-0">
            {preview ? (
              <>
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="font-mono text-[10px] text-white tracking-widest">Change</span>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="text-2xl mb-1 opacity-40">📷</div>
                <div className="font-mono text-[9px] text-white/30 tracking-widest">
                  {uploading ? 'Uploading...' : 'Click to upload'}
                </div>
              </div>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <div className="font-mono text-[10px] text-gold animate-pulse tracking-widest">Uploading...</div>
              </div>
            )}
          </div>

          {/* URL input + file input */}
          <div className="flex-1 flex flex-col gap-2 w-full">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0])}
            />
            <input
              className={iCls}
              value={data.image_url}
              onChange={e => { setData({ ...data, image_url: e.target.value }); setPreview(e.target.value) }}
              placeholder="Or paste image URL..."
            />
            <div className="font-mono text-[9px] text-white/25 tracking-[.05em]">
              Upload karo ya URL paste karo. Supabase Storage se auto-upload hoga.
            </div>
            <button type="button" onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="font-mono text-[9px] tracking-[.15em] uppercase text-gold border border-gold/20
                hover:border-gold/50 px-4 py-2 transition-colors w-fit disabled:opacity-50">
              {uploading ? 'Uploading...' : '📷 Choose Image'}
            </button>
          </div>
        </div>
      </div>

      {/* Other fields */}
      {fields.map(f => (
        <div key={f.key} className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/40">{f.label}</label>
          <input className={iCls} value={(data as any)[f.key]} placeholder={f.ph}
            onChange={e => setData({ ...data, [f.key]: e.target.value })} />
        </div>
      ))}

      <div className="col-span-full flex flex-col gap-1.5">
        <label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/40">Description</label>
        <textarea className={`${iCls} min-h-[80px] resize-y`} value={data.description}
          onChange={e => setData({ ...data, description: e.target.value })} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/40">Tech Stack (comma separated)</label>
        <input className={iCls} value={data.tech_stack} placeholder="Next.js, Node.js, MongoDB"
          onChange={e => setData({ ...data, tech_stack: e.target.value })} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/40">Gradient CSS (no image hone par)</label>
        <input className={iCls} value={data.gradient}
          onChange={e => setData({ ...data, gradient: e.target.value })} />
      </div>

      <div className="col-span-full flex gap-3 mt-2">
        <button onClick={() => onSave({ ...data, tech_stack: data.tech_stack.split(',').map((s: string) => s.trim()).filter(Boolean) })}
          disabled={uploading}
          className="font-mono text-[10px] tracking-[.15em] uppercase text-bg-primary bg-gold px-6 py-2.5 hover:opacity-85 transition-opacity disabled:opacity-50">
          {uploading ? 'Wait...' : 'Save Project'}
        </button>
        <button onClick={onCancel}
          className="font-mono text-[10px] tracking-[.15em] uppercase text-white/40 hover:text-white border border-gold/10 px-6 py-2.5 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  )
}

/* ── Testimonial Form ── */
function TestimonialForm({ initial, onSave, onCancel }: { initial: Testimonial | null; onSave: (d: any) => void; onCancel: () => void }) {
  const [data, setData] = useState({
    author_name:   initial?.author_name || '',
    author_role:   initial?.author_role || '',
    content:       initial?.content || '',
    rating:        initial?.rating || 5,
    is_active:     initial?.is_active ?? true,
    display_order: initial?.display_order || 0,
  })
  return (
    <div className="border border-gold/20 bg-bg-secondary p-5 md:p-7 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <h3 className="col-span-full font-cormorant text-xl font-light">{initial ? 'Edit' : 'Add'} Testimonial</h3>
      {[{ label: 'Author Name', key: 'author_name', ph: 'Rahul Sharma' }, { label: 'Author Role', key: 'author_role', ph: 'CEO, TechVentures' }].map(f => (
        <div key={f.key} className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/40">{f.label}</label>
          <input className={iCls} value={(data as any)[f.key]} placeholder={f.ph} onChange={e => setData({ ...data, [f.key]: e.target.value })} />
        </div>
      ))}
      <div className="col-span-full flex flex-col gap-1.5">
        <label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/40">Review Content</label>
        <textarea className={`${iCls} min-h-[100px] resize-y`} value={data.content} onChange={e => setData({ ...data, content: e.target.value })} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/40">Rating (1–5)</label>
        <input className={iCls} type="number" min={1} max={5} value={data.rating} onChange={e => setData({ ...data, rating: +e.target.value })} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/40">Display Order</label>
        <input className={iCls} type="number" value={data.display_order} onChange={e => setData({ ...data, display_order: +e.target.value })} />
      </div>
      <div className="col-span-full flex gap-3 mt-2">
        <button onClick={() => onSave(data)} className="font-mono text-[10px] tracking-[.15em] uppercase text-bg-primary bg-gold px-6 py-2.5 hover:opacity-85 transition-opacity">Save</button>
        <button onClick={onCancel} className="font-mono text-[10px] tracking-[.15em] uppercase text-white/40 hover:text-white border border-gold/10 px-6 py-2.5 transition-colors">Cancel</button>
      </div>
    </div>
  )
}