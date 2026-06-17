import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usePortal } from '../context/PortalContext'
import { stats } from '../data/dummyData'

function HomePage() {
  const { user } = useAuth()
  const { jobs } = usePortal()
  const openJobs = jobs.filter((job) => job.status === 'Open')
  const latestJobs = openJobs.slice(0, 3)

  return (
    <div className="mx-auto grid max-w-7xl gap-10">
      <section className="grid gap-8 rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-8 shadow-soft backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-brand-500/10 px-3 py-1 text-sm font-semibold text-brand-200">
            Premium job matching experience
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Build your career with top remote and office roles.
            </h1>
            <p className="max-w-xl text-slate-300 sm:text-lg">
              {user
                ? `Welcome back, ${user.name}. ${openJobs.length} open roles are waiting for your application.`
                : 'Discover curated opportunities, manage applicant tracking, and launch your job portal journey with a modern dashboard interface.'}
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link to="/jobs" className="btn-primary w-full sm:w-auto">
              Explore Jobs
            </Link>
            <Link to="/applications" className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white">
              View Applications
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] bg-gradient-to-br from-brand-500/10 via-slate-900/70 to-slate-950/60 p-1">
          <div className="card-glow space-y-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Featured role</p>
              <h2 className="text-2xl font-semibold text-white">Senior Product Designer</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/90 p-5">
                <p className="text-sm text-slate-400">Location</p>
                <p className="mt-2 font-semibold text-white">New York / Remote</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5">
                <p className="text-sm text-slate-400">Salary</p>
                <p className="mt-2 font-semibold text-white">$95k - $130k</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {stats.map((item) => (
          <article key={item.label} className="card-glow">
            <p className="text-sm uppercase tracking-[0.25em] text-brand-200">{item.label}</p>
            <p className="mt-4 text-4xl font-bold text-white">{item.value}</p>
            <p className="mt-2 text-slate-400">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-8 shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white">Latest job postings</h2>
            <p className="mt-2 max-w-2xl text-slate-400">Hand-picked vacancies aligned with the backend job portal schema and applicant workflows.</p>
          </div>
          <Link className="btn-primary" to="/jobs">
            See all jobs
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {latestJobs.length === 0 ? (
            <div className="rounded-3xl border border-slate-800/70 bg-slate-950/90 p-8 text-center text-slate-300">
              <p className="text-lg font-semibold text-white">No open roles right now.</p>
              <p className="mt-2">Check back later for new postings.</p>
            </div>
          ) : (
            latestJobs.map((job) => (
              <article key={job.id} className="rounded-3xl border border-slate-800/70 bg-slate-950/90 p-6 transition hover:-translate-y-1 hover:border-brand-500/40">
                <p className="text-sm font-semibold text-brand-300">{job.type}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{job.title}</h3>
                <p className="mt-3 text-slate-400">{job.company}</p>
                <div className="mt-4 text-sm text-slate-300 line-clamp-3">{job.description}</div>
                <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-300">
                  <span className="rounded-full bg-slate-800/70 px-3 py-1">{job.location}</span>
                  <span className="rounded-full bg-slate-800/70 px-3 py-1">{job.experience}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to={`/job/${job.id}`}
                    className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-400"
                  >
                    View details
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage
