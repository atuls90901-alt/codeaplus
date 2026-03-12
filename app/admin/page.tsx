'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Project, Testimonial, Contact } from '@/types'

type Tab = 'projects' | 'testimonials' | 'pending' | 'contacts'

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('projects')
  const [projects, setProjects] = useState<Project[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [pending, setPending] = useState<Testimonial[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showTestiForm, setShowTestiForm] = useState(false)
  const [editProject, setEditProject] = useState<Project | null>(null)
  const [editTesti, setEditTesti] = useState<Testimonial | null>(null)

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

  const logout = async () => { await supabase.auth.signOut(); router.push('/admin/login') }
  const deleteProject = async (id: string) => { await supabase.from('projects').delete().eq('id', id); fetchAll() }
  const deleteTesti = async (id: string) => { await supabase.from('testimonials').delete().eq('id', id); fetchAll() }
  const markRead = async (id: string) => { await supabase.from('contacts').update({ is_read: true }).eq('id', id); fetchAll() }

  const approveReview = async (id: string) => {
    await supabase.from('testimonials').update({ status: 'approved', is_active: true }).eq('id', id)
    fetchAll()
  }
  const rejectReview = async (id: string) => {
    await supabase.from('testimonials').update({ status: 'rejected' }).eq('id', id)
    fetchAll()
  }

  const iCls = "w-full bg-[#0a0a0a] border border-gold/10 focus:border-gold text-white font-light text-[13px] px-4 py-2.5 outline-none transition-all"

  const tabs: { key: Tab; label: string; badge?: number }[] = [
    { key: 'projects', label: 'Projects' },
    { key: 'testimonials', label: 'Testimonials' },
    { key: 'pending', label: 'Pending Reviews', badge: pending.length },
    { key: 'contacts', label: 'Contacts', badge: contacts.filter(c => !c.is_read).length },
  ]

  if (loading) return (
    <div className="min-h-screen bg-[#060606] flex items-center justify-center">
      <div className="font-mono text-[11px] tracking-widest text-gold">Loading...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#060606] text-white font-outfit">
      {/* Header */}
      <div className="border-b border-gold/10 px-10 py-5 flex justify-between items-center bg-[#0a0a0a]">
        <div className="font-cormorant text-2xl font-light">CodeaPlus<span className="text-gold">.</span> <span className="text-white/40 text-lg">Admin</span></div>
        <div className="flex gap-3">
          <a href="/" target="_blank" className="font-mono text-[9px] tracking-[.2em] uppercase text-white/40 hover:text-gold transition-colors border border-gold/10 px-4 py-2">View Site ↗</a>
          <button onClick={logout} className="font-mono text-[9px] tracking-[.2em] uppercase text-white/40 hover:text-red-400 transition-colors border border-gold/10 px-4 py-2">Logout</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-10 pt-8">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`font-mono text-[10px] tracking-[.2em] uppercase px-6 py-3 border-b-2 transition-all flex items-center gap-2 ${tab === t.key ? 'text-gold border-gold' : 'text-white/40 border-transparent hover:text-white/70'}`}>
            {t.label}
            {t.badge ? (
              <span className="bg-gold text-[#060606] text-[8px] px-1.5 py-0.5 rounded-full font-bold">{t.badge}</span>
            ) : null}
          </button>
        ))}
      </div>
      <div className="h-px bg-gold/10 mx-10" />

      <div className="p-10">

        {/* PROJECTS */}
        {tab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-7">
              <h2 className="font-cormorant text-2xl font-light">Projects <span className="text-white/30">({projects.length})</span></h2>
              <button onClick={() => { setEditProject(null); setShowProjectForm(true) }}
                className="font-mono text-[10px] tracking-[.15em] uppercase text-[#060606] bg-gold px-5 py-2.5 hover:bg-gold-light transition-colors">
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
                <div key={p.id} className="flex items-center gap-5 p-5 border border-gold/10 bg-[#0a0a0a] hover:bg-[#111] transition-colors">
                  <div className="w-16 h-10 rounded flex-shrink-0" style={{ background: p.gradient }} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[15px] truncate">{p.title}</div>
                    <div className="font-mono text-[9px] tracking-[.1em] uppercase text-gold mt-0.5">{p.category}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditProject(p); setShowProjectForm(true) }} className="font-mono text-[9px] tracking-[.1em] uppercase text-white/40 hover:text-gold border border-gold/10 px-3 py-1.5 transition-colors">Edit</button>
                    <button onClick={() => deleteProject(p.id)} className="font-mono text-[9px] tracking-[.1em] uppercase text-white/40 hover:text-red-400 border border-gold/10 px-3 py-1.5 transition-colors">Delete</button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && <div className="text-center py-16 text-white/30 font-mono text-[11px] tracking-widest">No projects yet.</div>}
            </div>
          </div>
        )}

        {/* TESTIMONIALS (Approved) */}
        {tab === 'testimonials' && (
          <div>
            <div className="flex justify-between items-center mb-7">
              <h2 className="font-cormorant text-2xl font-light">Approved Testimonials <span className="text-white/30">({testimonials.length})</span></h2>
              <button onClick={() => { setEditTesti(null); setShowTestiForm(true) }}
                className="font-mono text-[10px] tracking-[.15em] uppercase text-[#060606] bg-gold px-5 py-2.5 hover:bg-gold-light transition-colors">
                + Add Manually
              </button>
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
                <div key={t.id} className="flex items-start gap-5 p-5 border border-gold/10 bg-[#0a0a0a] hover:bg-[#111] transition-colors">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-cormorant text-lg"
                    style={{ background: 'linear-gradient(135deg,#7a6028,#C9A84C)', color: '#060606' }}>
                    {t.avatar_letter}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-[15px]">{t.author_name}</span>
                      <span className="text-gold text-[11px]">{'★'.repeat(t.rating)}</span>
                    </div>
                    <div className="font-mono text-[9px] tracking-[.1em] uppercase text-gold mt-0.5 mb-2">{t.author_role}</div>
                    <div className="text-[13px] text-white/50 font-light line-clamp-2">"{t.content}"</div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => { setEditTesti(t); setShowTestiForm(true) }} className="font-mono text-[9px] tracking-[.1em] uppercase text-white/40 hover:text-gold border border-gold/10 px-3 py-1.5 transition-colors">Edit</button>
                    <button onClick={() => deleteTesti(t.id)} className="font-mono text-[9px] tracking-[.1em] uppercase text-white/40 hover:text-red-400 border border-gold/10 px-3 py-1.5 transition-colors">Delete</button>
                  </div>
                </div>
              ))}
              {testimonials.length === 0 && <div className="text-center py-16 text-white/30 font-mono text-[11px] tracking-widest">No approved testimonials.</div>}
            </div>
          </div>
        )}

        {/* PENDING REVIEWS */}
        {tab === 'pending' && (
          <div>
            <div className="mb-7">
              <h2 className="font-cormorant text-2xl font-light">Pending Reviews <span className="text-white/30">({pending.length})</span></h2>
              <p className="font-mono text-[10px] tracking-[.1em] uppercase text-white/30 mt-1">Approve or reject user-submitted reviews</p>
            </div>
            <div className="flex flex-col gap-3">
              {pending.map(t => (
                <div key={t.id} className="p-6 border border-gold/20 bg-gold/3">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center font-cormorant text-lg"
                        style={{ background: 'linear-gradient(135deg,#7a6028,#C9A84C)', color: '#060606' }}>
                        {t.avatar_letter}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-[15px]">{t.author_name}</span>
                          <span className="text-gold text-[12px]">{'★'.repeat(t.rating)}</span>
                        </div>
                        <div className="font-mono text-[9px] tracking-[.1em] uppercase text-gold mt-0.5">{t.author_role}</div>
                      </div>
                    </div>
                    <div className="font-mono text-[9px] text-white/30">
                      {new Date(t.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>

                  <p className="text-[14px] text-white/70 font-light leading-[1.7] border-l-2 border-gold/20 pl-4 mb-5 italic">
                    "{t.content}"
                  </p>

                  <div className="flex gap-3">
                    <button onClick={() => approveReview(t.id)}
                      className="font-mono text-[10px] tracking-[.15em] uppercase text-[#060606] bg-gold px-6 py-2.5 hover:bg-gold-light transition-colors flex items-center gap-2">
                      ✓ Approve & Publish
                    </button>
                    <button onClick={() => rejectReview(t.id)}
                      className="font-mono text-[10px] tracking-[.15em] uppercase text-white/40 hover:text-red-400 border border-gold/10 hover:border-red-400/30 px-6 py-2.5 transition-colors">
                      ✕ Reject
                    </button>
                  </div>
                </div>
              ))}
              {pending.length === 0 && (
                <div className="text-center py-20 border border-gold/10">
                  <div className="text-3xl mb-4">✓</div>
                  <div className="text-white/30 font-mono text-[11px] tracking-widest">All caught up! No pending reviews.</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CONTACTS */}
        {tab === 'contacts' && (
          <div>
            <h2 className="font-cormorant text-2xl font-light mb-7">Contact Submissions <span className="text-white/30">({contacts.length})</span></h2>
            <div className="flex flex-col gap-2">
              {contacts.map(c => (
                <div key={c.id} className={`p-6 border transition-colors ${c.is_read ? 'border-gold/10 bg-[#0a0a0a]' : 'border-gold/30 bg-gold/3'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-[15px]">{c.name}</span>
                        {!c.is_read && <span className="font-mono text-[8px] tracking-widest uppercase text-[#060606] bg-gold px-2 py-0.5">New</span>}
                      </div>
                      <div className="text-[13px] text-white/50 mt-0.5">{c.email}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[9px] tracking-[.1em] uppercase text-gold">{c.service}</div>
                      <div className="font-mono text-[9px] tracking-[.1em] uppercase text-white/40 mt-1">{c.budget}</div>
                    </div>
                  </div>
                  {c.message && <p className="text-[13px] text-white/50 font-light leading-[1.7] border-t border-gold/10 pt-3">{c.message}</p>}
                  <div className="flex justify-between items-center mt-4">
                    <div className="font-mono text-[9px] text-white/30">
                      {new Date(c.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                    {!c.is_read && (
                      <button onClick={() => markRead(c.id)} className="font-mono text-[9px] tracking-[.1em] uppercase text-white/40 hover:text-gold border border-gold/10 px-3 py-1.5 transition-colors">Mark Read</button>
                    )}
                  </div>
                </div>
              ))}
              {contacts.length === 0 && <div className="text-center py-16 text-white/30 font-mono text-[11px] tracking-widest">No contacts yet.</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Project Form
function ProjectForm({ initial, onSave, onCancel }: { initial: Project | null, onSave: (d: any) => void, onCancel: () => void }) {
  const [data, setData] = useState({
    title: initial?.title || '', category: initial?.category || '',
    description: initial?.description || '', tech_stack: initial?.tech_stack?.join(', ') || '',
    gradient: initial?.gradient || 'linear-gradient(135deg,#0a1628,#1a3a5c)',
    live_url: initial?.live_url || '', display_order: initial?.display_order || 0,
    is_featured: initial?.is_featured || false,
  })
  const iCls = "w-full bg-[#0a0a0a] border border-gold/10 focus:border-gold text-white font-light text-[13px] px-4 py-2.5 outline-none transition-all"
  return (
    <div className="border border-gold/20 bg-[#0a0a0a] p-7 mb-6 grid grid-cols-2 gap-4">
      <h3 className="col-span-2 font-cormorant text-xl font-light mb-2">{initial ? 'Edit' : 'Add'} Project</h3>
      {[{ label: 'Title', key: 'title', ph: 'LuxCart — Premium Retail' }, { label: 'Category', key: 'category', ph: 'E-Commerce · MERN Stack' }, { label: 'Live URL', key: 'live_url', ph: 'https://...' }, { label: 'Display Order', key: 'display_order', ph: '1' }].map(f => (
        <div key={f.key} className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/40">{f.label}</label>
          <input className={iCls} value={(data as any)[f.key]} placeholder={f.ph} onChange={e => setData({ ...data, [f.key]: e.target.value })} />
        </div>
      ))}
      <div className="col-span-2 flex flex-col gap-1.5">
        <label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/40">Description</label>
        <textarea className={`${iCls} min-h-[80px] resize-y`} value={data.description} onChange={e => setData({ ...data, description: e.target.value })} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/40">Tech Stack (comma separated)</label>
        <input className={iCls} value={data.tech_stack} onChange={e => setData({ ...data, tech_stack: e.target.value })} placeholder="React, Node.js, MongoDB" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/40">Gradient CSS</label>
        <input className={iCls} value={data.gradient} onChange={e => setData({ ...data, gradient: e.target.value })} />
      </div>
      <div className="col-span-2 flex gap-3 mt-2">
        <button onClick={() => onSave({ ...data, tech_stack: data.tech_stack.split(',').map((s: string) => s.trim()).filter(Boolean) })} className="font-mono text-[10px] tracking-[.15em] uppercase text-[#060606] bg-gold px-6 py-2.5 hover:bg-gold-light transition-colors">Save</button>
        <button onClick={onCancel} className="font-mono text-[10px] tracking-[.15em] uppercase text-white/40 hover:text-white border border-gold/10 px-6 py-2.5 transition-colors">Cancel</button>
      </div>
    </div>
  )
}

// Testimonial Form
function TestimonialForm({ initial, onSave, onCancel }: { initial: Testimonial | null, onSave: (d: any) => void, onCancel: () => void }) {
  const [data, setData] = useState({
    author_name: initial?.author_name || '', author_role: initial?.author_role || '',
    content: initial?.content || '', rating: initial?.rating || 5,
    is_active: initial?.is_active ?? true, display_order: initial?.display_order || 0,
  })
  const iCls = "w-full bg-[#0a0a0a] border border-gold/10 focus:border-gold text-white font-light text-[13px] px-4 py-2.5 outline-none transition-all"
  return (
    <div className="border border-gold/20 bg-[#0a0a0a] p-7 mb-6 grid grid-cols-2 gap-4">
      <h3 className="col-span-2 font-cormorant text-xl font-light mb-2">{initial ? 'Edit' : 'Add'} Testimonial</h3>
      {[{ label: 'Author Name', key: 'author_name', ph: 'Rahul Sharma' }, { label: 'Author Role', key: 'author_role', ph: 'CEO, TechVentures' }].map(f => (
        <div key={f.key} className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/40">{f.label}</label>
          <input className={iCls} value={(data as any)[f.key]} placeholder={f.ph} onChange={e => setData({ ...data, [f.key]: e.target.value })} />
        </div>
      ))}
      <div className="col-span-2 flex flex-col gap-1.5">
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
      <div className="col-span-2 flex gap-3 mt-2">
        <button onClick={() => onSave(data)} className="font-mono text-[10px] tracking-[.15em] uppercase text-[#060606] bg-gold px-6 py-2.5 hover:bg-gold-light transition-colors">Save</button>
        <button onClick={onCancel} className="font-mono text-[10px] tracking-[.15em] uppercase text-white/40 hover:text-white border border-gold/10 px-6 py-2.5 transition-colors">Cancel</button>
      </div>
    </div>
  )
}