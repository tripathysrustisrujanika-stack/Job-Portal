import { createContext, useContext, useMemo, useState } from 'react'
import { initialApplications, initialJobs } from '../data/dummyData'

const PortalContext = createContext(null)

export function PortalProvider({ children }) {
  const [jobs, setJobs] = useState(initialJobs)
  const [applications, setApplications] = useState(initialApplications)

  const applyToJob = ({ jobId, applicantName, applicantEmail }) => {
    const job = jobs.find((item) => item.id === jobId)
    if (!job || job.status !== 'Open') {
      return false
    }

    setJobs((prev) =>
      prev.map((item) =>
        item.id === jobId
          ? { ...item, status: 'Closed', highlight: 'Applied' }
          : item
      )
    )

    setApplications((prev) => [
      {
        id: `app-${Date.now()}`,
        jobTitle: job.title,
        company: job.company,
        appliedDate: new Date().toISOString().slice(0, 10),
        status: 'Submitted',
        applicantName,
        applicantEmail,
      },
      ...prev,
    ])

    return true
  }

  const addJob = ({ title, company, location, type, experience, salary, description, posterName }) => {
    const newJob = {
      id: `job-${Date.now()}`,
      title,
      company,
      location,
      type,
      experience,
      salary,
      description,
      posterName,
      status: 'Open',
    }
    setJobs((prev) => [newJob, ...prev])
    return newJob
  }

  const value = useMemo(
    () => ({ jobs, applications, applyToJob, addJob }),
    [jobs, applications]
  )

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
}

export function usePortal() {
  const context = useContext(PortalContext)
  if (!context) {
    throw new Error('usePortal must be used within PortalProvider')
  }
  return context
}
