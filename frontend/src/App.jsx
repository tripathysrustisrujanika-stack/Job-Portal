import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage'
import JobDetailPage from './pages/JobDetailPage'
import PostJobPage from './pages/PostJobPage'
import ApplicationsPage from './pages/ApplicationsPage'
import AdminDashboard from './pages/AdminDashboard'
import AuthPage from './pages/AuthPage'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/job/:jobId" element={<JobDetailPage />} />
          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<AuthPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
