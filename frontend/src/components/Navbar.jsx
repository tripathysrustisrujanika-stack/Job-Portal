import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Jobs', to: '/jobs' },
  { label: 'Applied', to: '/applications' },
]

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-bold tracking-tight text-white">
          Job Portal
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-brand-300' : 'text-slate-300 hover:text-white'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {user && (
            <NavLink
              to="/post-job"
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-brand-300' : 'text-slate-300 hover:text-white'}`
              }
            >
              Post Job
            </NavLink>
          )}
          {user?.isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-brand-300' : 'text-slate-300 hover:text-white'}`
              }
            >
              Admin
            </NavLink>
          )}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-sm text-slate-200 sm:inline">Hello, {user.name}</span>
              <button
                onClick={() => {
                  logout()
                  navigate('/login')
                }}
                className="btn-primary"
                type="button"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
