import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usePortal } from '../context/PortalContext'

function ApplicationsPage() {
  const { user } = useAuth()
  const { applications } = usePortal()
  const userApplications = user ? applications.filter((app) => app.applicantEmail === user.email) : []

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-8 shadow-soft backdrop-blur-xl">
        <h1 className="text-3xl font-semibold text-white">Your applied jobs</h1>
        <p className="mt-2 text-slate-400">Track status updates and review your recent submissions.</p>
      </div>

      {!user ? (
        <div className="rounded-[2rem] border border-amber-500/20 bg-amber-500/5 p-10 text-center text-amber-100 shadow-soft">
          <p className="text-xl font-semibold text-white">Login to view your applications</p>
          <p className="mt-2 text-slate-300">Your application history is stored in the portal when you apply.</p>
          <Link to="/login" className="btn-primary mt-5 inline-flex">
            Go to login
          </Link>
        </div>
      ) : userApplications.length === 0 ? (
        <div className="rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-10 text-center text-slate-300 shadow-soft">
          <p className="text-lg font-semibold text-white">No applications yet.</p>
          <p className="mt-2">Apply to jobs from the Jobs page to see them appear here.</p>
        </div>
      ) : (
        <section className="grid gap-6">
          {userApplications.map((app) => (
            <div key={app.id} className="card-glow flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-brand-200">{app.status}</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{app.jobTitle}</h2>
                <p className="mt-1 text-slate-400">{app.company}</p>
                <p className="mt-2 text-sm text-slate-400">Applicant: {app.applicantName}</p>
              </div>
              <div className="space-y-2 rounded-3xl bg-slate-950/90 px-5 py-4 text-slate-300">
                <div>
                  <p className="text-sm text-slate-400">Applied</p>
                  <p className="mt-1 text-sm font-semibold text-white">{app.appliedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Status</p>
                  <p className="mt-1 text-sm font-semibold text-white">{app.status}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

export default ApplicationsPage
