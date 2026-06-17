import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usePortal } from '../context/PortalContext'

function JobDetailPage() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { jobs, applyToJob } = usePortal()

  const job = useMemo(() => jobs.find((item) => item.id === jobId), [jobs, jobId])

  if (!job) {
    return (
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-10 shadow-soft text-center text-slate-300">
        <p className="text-xl font-semibold text-white">Job not found</p>
        <p className="mt-3">The job detail you requested is not available or has been removed.</p>
        <Link to="/jobs" className="btn-primary mt-6 inline-flex">
          Back to Jobs
        </Link>
      </div>
    )
  }

  const handleApply = () => {
    if (!user) {
      navigate('/login')
      return
    }
    const success = applyToJob({ jobId: job.id, applicantName: user.name, applicantEmail: user.email })
    if (success) {
      navigate('/applications')
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-8 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-200">{job.type}</p>
            <h1 className="mt-4 text-4xl font-semibold text-white">{job.title}</h1>
            <p className="mt-2 text-slate-400">{job.company} • {job.location}</p>
          </div>
          <div className="rounded-3xl bg-slate-950/90 px-6 py-4 text-right">
            <p className="text-sm text-slate-400">Salary</p>
            <p className="mt-2 text-xl font-semibold text-white">{job.salary}</p>
            <p className="mt-4 text-sm text-slate-400">Status</p>
            <p className="mt-1 text-sm font-semibold text-brand-200">{job.status}</p>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/90 p-8 shadow-soft">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-white">Job description</h2>
              <p className="mt-4 text-slate-300 leading-8">{job.description}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-900/80 p-5">
                <p className="text-sm text-slate-400">Experience</p>
                <p className="mt-2 text-white">{job.experience}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-5">
                <p className="text-sm text-slate-400">Location</p>
                <p className="mt-2 text-white">{job.location}</p>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-slate-900/90 p-6">
            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-950/80 p-4">
                <p className="text-sm text-slate-400">Posted by</p>
                <p className="mt-2 text-white">{job.posterName || 'Hiring Team'}</p>
              </div>
              <button
                onClick={handleApply}
                className="btn-primary w-full"
                type="button"
                disabled={job.status !== 'Open'}
              >
                {job.status === 'Open' ? 'Apply now' : 'This job is closed'}
              </button>
              <Link to="/jobs" className="inline-flex w-full justify-center rounded-full border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white">
                Back to jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetailPage
