function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/95 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Job Portal</h2>
            <p className="max-w-md text-slate-400">
              A modern hiring dashboard to post roles, track applications, and manage career opportunities with a polished experience.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Quick links</h3>
            <div className="grid gap-2 text-sm text-slate-300">
              <a href="/" className="hover:text-white">Home</a>
              <a href="/jobs" className="hover:text-white">Jobs</a>
              <a href="/applications" className="hover:text-white">Applications</a>
              <a href="/login" className="hover:text-white">Login</a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <p className="text-sm text-slate-400">Reach out for premium support, employer onboarding, or feature requests.</p>
            <p className="text-sm text-slate-300">support@jobportal.com</p>
            <p className="text-sm text-slate-300">+91 98765 43210</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-800/80 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Job Portal. All rights reserved.</span>
          <span>Built with React & Tailwind.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
