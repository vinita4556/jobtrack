import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { demoApplications } from '../data/demo'

const AppContext = createContext(null)

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const DEFAULT_PROFILE = { name: 'Vinita Parmar', email: 'vinita@example.com', defaultJobType: 'Full-time', defaultStatus: 'Applied' }

export function AppProvider({ children }) {
  const [applications, setApplications] = useState(() => load('jobtrack-applications', demoApplications))
  const [theme, setTheme] = useState(() => load('jobtrack-theme', 'light'))
  const [profile, setProfile] = useState(() => load('jobtrack-profile', DEFAULT_PROFILE))
  const [query, setQuery] = useState('')
  const [toasts, setToasts] = useState([])

  useEffect(() => localStorage.setItem('jobtrack-applications', JSON.stringify(applications)), [applications])
  useEffect(() => localStorage.setItem('jobtrack-profile', JSON.stringify(profile)), [profile])
  useEffect(() => {
    localStorage.setItem('jobtrack-theme', JSON.stringify(theme))
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const dismissToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), [])
  const notify = useCallback((message, type = 'success') => {
    const id = crypto.randomUUID()
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => dismissToast(id), 3500)
  }, [dismissToast])

  const addApplication = (data) => {
    setApplications((apps) => [{ ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...apps])
    notify('Application added successfully')
  }
  const updateApplication = (id, data, silent = false) => {
    setApplications((apps) => apps.map((a) => (a.id === id ? { ...a, ...data } : a)))
    if (!silent) notify('Application updated successfully')
  }
  const deleteApplication = (id) => {
    setApplications((apps) => apps.filter((a) => a.id !== id))
    notify('Application deleted successfully')
  }
  const clearAll = () => {
    setApplications([])
    notify('All data cleared')
  }

  const value = useMemo(() => ({
    applications, theme, setTheme, profile, setProfile, query, setQuery, toasts, dismissToast, notify,
    addApplication, updateApplication, deleteApplication, clearAll,
  }), [applications, theme, profile, query, toasts]) // eslint-disable-line react-hooks/exhaustive-deps

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
