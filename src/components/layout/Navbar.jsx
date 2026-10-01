import { useNavigate } from 'react-router-dom'
import { Bell, Menu, Moon, Search, Sun } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function Navbar({ onMenu }) {
  const { query, setQuery, theme, setTheme, profile, notify } = useApp()
  const navigate = useNavigate()
  const initials = profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 sm:px-6">
      <button className="icon-btn lg:hidden" onClick={onMenu} aria-label="Open menu"><Menu size={20} /></button>
      <div className="relative max-w-md flex-1">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="search" aria-label="Search applications" className="input pl-9" placeholder="Search company, role, location, tags…"
          value={query} onChange={(e) => { setQuery(e.target.value); navigate('/applications') }} />
      </div>
      <div className="ml-auto flex items-center gap-1">
        <button className="icon-btn" aria-label="Notifications" onClick={() => notify('No new notifications', 'info')}><Bell size={18} /></button>
        <button className="icon-btn" aria-label="Toggle dark mode" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="ml-2 flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">{initials}</span>
          <span className="hidden text-sm font-medium sm:block">{profile.name}</span>
        </div>
      </div>
    </header>
  )
}
