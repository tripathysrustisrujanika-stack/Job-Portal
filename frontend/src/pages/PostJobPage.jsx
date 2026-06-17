import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usePortal } from '../context/PortalContext'

const initialForm = {
  title: '',
  company: '',
  location: '',
  type: 'Full-time',
  experience: '',
  salary: '',
  description: '',
}

function PostJobPage() {
  const { user } = useAuth()
  const { addJob } = usePortal()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-10 text-center text-slate-300 shadow-soft">
        <p className="text-xl font-semibold text-white">Login required</p>
        <p className="mt-3">You must login before posting a new job.</p>
      </div>
    )
  }

  const handleChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }))
    setError('')
    setMessage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.title || !form.company || !form.location || !form.experience || !form.salary || !form.description) {
      setError('Fill in all fields before posting the job.')
      return
    }
    const job = addJob({ ...form, posterName: user.name })
    setMessage(`Job posted successfully: ${job.title}`)
    setForm(initialForm)
    navigate('/jobs')
  }

  return (
    <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-8 shadow-soft">
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Post a new job</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Create a role and publish it live.</h1>
          <p className="mt-2 text-slate-400">Fill the form below to add a new job listing to the portal.</p>
        </div>

        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-300">Job title</label>
              <input
                value={form.title}
                onChange={handleChange('title')}
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">Company</label>
              <input
                value={form.company}
                onChange={handleChange('company')}
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-300">Location</label>
              <input
                value={form.location}
                onChange={handleChange('location')}
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">Job type</label>
              <select
                value={form.type}
                onChange={handleChange('type')}
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Hybrid</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-300">Experience</label>
              <input
                value={form.experience}
                onChange={handleChange('experience')}
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">Salary range</label>
              <input
                value={form.salary}
                onChange={handleChange('salary')}
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300">Job description</label>
            <textarea
              value={form.description}
              onChange={handleChange('description')}
              rows={5}
              className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
            />
          </div>

          {error && <p className="rounded-3xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}
          {message && <p className="rounded-3xl bg-brand-500/10 px-4 py-3 text-sm text-brand-100">{message}</p>}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button className="btn-primary rounded-full px-6 py-3" type="submit">
              Post job
            </button>
            <button
              type="button"
              onClick={() => navigate('/jobs')}
              className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostJobPage
