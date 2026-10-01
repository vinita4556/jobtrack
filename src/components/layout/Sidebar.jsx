import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Briefcase, BarChart3, Settings, Sparkles, LifeBuoy, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/applications', label: 'Applications', icon: Briefcase },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
]
const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300'
    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`

export default function Sidebar({ open, onClose }) {
  const { notify } = useApp()
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white p-4 transition-transform duration-200 dark:border-slate-800 dark:bg-slate-900 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-6 flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">JT</span>
            <span className="text-lg font-semibold">JobTrack</span>
          </div>
          <button className="icon-btn lg:hidden" onClick={onClose} aria-label="Close menu"><X size={18} /></button>
        </div>
        <nav className="flex flex-1 flex-col gap-1" aria-label="Main navigation">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/'} className={linkClass} onClick={onClose}><Icon size={18} />{label}</NavLink>
          ))}
        </nav>
        <div className="space-y-1 border-t border-slate-200 pt-4 dark:border-slate-800">
          <button onClick={() => notify('JobTrack Pro is coming soon', 'info')} className="flex w-full items-center gap-3 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
            <Sparkles size={18} />Upgrade to Pro
          </button>
          <a href="mailto:support@example.com" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
            <LifeBuoy size={18} />Help &amp; Support
          </a>
        </div>
      </aside>
    </>
  )
}
