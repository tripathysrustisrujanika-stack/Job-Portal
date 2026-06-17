import { useAuth } from '../context/AuthContext'
import { usePortal } from '../context/PortalContext'

function AdminDashboard() {
  const { user } = useAuth()
  const { applications, jobs } = usePortal()

  if (!user?.isAdmin) {
    return (
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-10 text-center text-slate-300 shadow-soft">
        <p className="text-xl font-semibold text-white">Admin access only</p>
        <p className="mt-3">You must login as admin to view the dashboard.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-8 shadow-soft">
        <h1 className="text-3xl font-semibold text-white">Admin dashboard</h1>
        <p className="mt-2 text-slate-400">Review all job postings and candidate applications in the portal.</p>
      </div>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/90 p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-white">Active jobs</h2>
          <div className="mt-6 space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="rounded-3xl border border-slate-800/70 bg-slate-900/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-400">{job.company}</p>
                    <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                  </div>
                  <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">
                    {job.status}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-300">{job.location} • {job.type} • {job.experience}</p>
                <p className="mt-3 text-sm text-slate-300 line-clamp-3">{job.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/90 p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-white">Applications</h2>
          <div className="mt-6 space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="rounded-3xl border border-slate-800/70 bg-slate-900/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-400">{app.company}</p>
                    <h3 className="text-lg font-semibold text-white">{app.jobTitle}</h3>
                  </div>
                  <span className="rounded-full bg-slate-800/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                    {app.status}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-300">Applicant: {app.applicantName} • {app.applicantEmail}</p>
                <p className="mt-2 text-sm text-slate-300">Applied on: {app.appliedDate}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard
