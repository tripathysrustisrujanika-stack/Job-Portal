import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { usePortal } from '../context/PortalContext'

function JobsPage() {
  const { user } = useAuth()
  const { jobs, applyToJob } = usePortal()
  const [feedback, setFeedback] = useState('')
  const navigate = useNavigate()
  const openJobs = jobs.filter((job) => job.status === 'Open')

  const handleApply = (jobId) => {
    if (!user) {
      navigate('/login')
      return
    }

    const success = applyToJob({ jobId, applicantName: user.name, applicantEmail: user.email })
    setFeedback(success ? 'Application submitted. This job will be removed from the list.' : 'Unable to apply to this job.')
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-8 shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">Open job listings</h1>
            <p className="mt-2 text-slate-400">Browse current openings and apply with one click. Closed jobs disappear automatically after application.</p>
          </div>
          <Link to={user ? '/post-job' : '/login'} className="btn-primary">
            {user ? 'Post a job' : 'Login to post'}
          </Link>
        </div>
        {feedback && <p className="mt-4 rounded-3xl bg-brand-500/10 px-4 py-3 text-sm text-brand-100">{feedback}</p>}
      </div>

      {!user && (
        <div className="rounded-[2rem] border border-amber-500/20 bg-amber-500/5 p-6 text-amber-100 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-200">Login required</p>
          <p className="mt-3 text-slate-300">Please login to apply for jobs and see your applications updated in the portal.</p>
        </div>
      )}

      {openJobs.length === 0 ? (
        <div className="rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-10 text-center text-slate-300 shadow-soft">
          <p className="text-lg font-semibold text-white">No active job postings available right now.</p>
          <p className="mt-2">Come back later or create an account to receive new alerts.</p>
        </div>
      ) : (
        <section className="grid gap-6 lg:grid-cols-2">
          {openJobs.map((job) => (
            <article key={job.id} className="card-glow">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">{job.title}</h2>
                  <p className="mt-2 text-slate-400">{job.company}</p>
                </div>
                <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">
                  {job.status}
                </span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-950/90 p-4">
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="mt-2 text-white">{job.location}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/90 p-4">
                  <p className="text-sm text-slate-400">Experience</p>
                  <p className="mt-2 text-white">{job.experience}</p>
                </div>
              </div>
              <p className="mt-5 text-slate-300 line-clamp-3">{job.description}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-brand-500/10 px-3 py-1 text-sm text-brand-200">{job.type}</span>
                <span className="rounded-full bg-slate-800/70 px-3 py-1 text-sm text-slate-200">{job.salary}</span>
                <Link
                  to={`/job/${job.id}`}
                  className="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  View details
                </Link>
                <button
                  onClick={() => handleApply(job.id)}
                  className="ml-auto rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-400"
                  type="button"
                >
                  Apply now
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  )
}

export default JobsPage
