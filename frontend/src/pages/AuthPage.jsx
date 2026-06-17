import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const initialForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function AuthPage() {
  const navigate = useNavigate()
  const { login, register } = useAuth()
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  const validationErrors = useMemo(() => {
    const errors = {}
    if (!form.email) errors.email = 'Email is required.'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email.'
    if (!form.password) errors.password = 'Password is required.'
    if (isRegister) {
      if (!form.name) errors.name = 'Name is required.'
      if (!form.confirmPassword) errors.confirmPassword = 'Confirm your password.'
      if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.'
      }
    }
    return errors
  }, [form, isRegister])

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (Object.keys(validationErrors).length > 0) {
      setError('Please fix the highlighted fields.')
      return
    }

    try {
      if (isRegister) {
        register({ name: form.name, email: form.email, password: form.password })
      } else {
        login({ email: form.email, password: form.password })
      }
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-8 shadow-soft backdrop-blur-xl">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6 rounded-[2rem] bg-slate-950/90 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Candidate portal</p>
          <h1 className="text-4xl font-semibold text-white">
            {isRegister ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="max-w-xl text-slate-400">
            {isRegister
              ? 'Register to apply for jobs and track your application progress.'
              : 'Login to manage your profile, applications, and saved job alerts.'}
          </p>
          <div className="space-y-3 rounded-3xl bg-slate-900/80 p-5 text-slate-300">
            <p className="font-semibold text-white">Fast setup</p>
            <p>Make sure to use a valid email. Your account will persist in local storage for demo flow.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister)
              setForm(initialForm)
              setError('')
            }}
            className="w-full rounded-full border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-brand-400 hover:text-white"
          >
            {isRegister ? 'Switch to login' : 'Switch to register'}
          </button>
        </div>

        <div className="rounded-[2rem] bg-slate-950/90 p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-slate-300">Name</label>
                <input
                  value={form.name}
                  onChange={handleChange('name')}
                  className={`mt-2 w-full rounded-3xl border px-4 py-3 text-sm text-white outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 ${
                    validationErrors.name ? 'border-rose-500/70 bg-rose-950/10' : 'border-slate-800 bg-slate-950/90'
                  }`}
                />
                {validationErrors.name && <p className="mt-2 text-sm text-rose-400">{validationErrors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                className={`mt-2 w-full rounded-3xl border px-4 py-3 text-sm text-white outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 ${
                  validationErrors.email ? 'border-rose-500/70 bg-rose-950/10' : 'border-slate-800 bg-slate-950/90'
                }`}
              />
              {validationErrors.email && <p className="mt-2 text-sm text-rose-400">{validationErrors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={handleChange('password')}
                className={`mt-2 w-full rounded-3xl border px-4 py-3 text-sm text-white outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 ${
                  validationErrors.password ? 'border-rose-500/70 bg-rose-950/10' : 'border-slate-800 bg-slate-950/90'
                }`}
              />
              {validationErrors.password && <p className="mt-2 text-sm text-rose-400">{validationErrors.password}</p>}
            </div>

            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-slate-300">Confirm Password</label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  className={`mt-2 w-full rounded-3xl border px-4 py-3 text-sm text-white outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 ${
                    validationErrors.confirmPassword ? 'border-rose-500/70 bg-rose-950/10' : 'border-slate-800 bg-slate-950/90'
                  }`}
                />
                {validationErrors.confirmPassword && <p className="mt-2 text-sm text-rose-400">{validationErrors.confirmPassword}</p>}
              </div>
            )}

            {error && <p className="rounded-3xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}
            <button type="submit" className="btn-primary w-full">
              {isRegister ? 'Register account' : 'Login to portal'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
