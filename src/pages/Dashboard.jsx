import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, CalendarClock, Gift, MessageSquare, Plus, Send } from 'lucide-react'
import StatCard from '../components/common/StatCard'
import StatusBadge from '../components/common/StatusBadge'
import EmptyState from '../components/common/EmptyState'
import { useApp } from '../context/AppContext'
import { computeStats, daysUntil, formatDate } from '../utils/helpers'

const greeting = () => {
  const hour = new Date().getHours()
  return hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
}

export default function Dashboard() {
  const { applications, profile } = useApp()
  const stats = useMemo(() => computeStats(applications), [applications])
  const recent = useMemo(() => [...applications].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5), [applications])
  const upcoming = useMemo(() => applications
    .filter((a) => a.deadline && a.status !== 'Rejected' && daysUntil(a.deadline) >= 0)
    .sort((a, b) => a.deadline.localeCompare(b.deadline)).slice(0, 5), [applications])

  const cards = [
    ['Total Applications', stats.total, Briefcase], ['Applied', stats.applied, Send],
    ['Interviews', stats.interviews, MessageSquare, 'text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-300'],
    ['Offers', stats.offers, Gift, 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-300'],
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{greeting()}, {profile.name.split(' ')[0]} 👋</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Track your applications and stay on top of your job search.</p>
        </div>
        <Link to="/add" className="btn-primary"><Plus size={16} />Add Application</Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label, value, icon, tone]) => <StatCard key={label} label={label} value={value} icon={icon} tone={tone} />)}</div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[['Interview Rate', stats.interviewRate], ['Response Rate', stats.responseRate]].map(([label, value]) => (
          <div key={label} className="card p-5">
            <div className="flex items-baseline justify-between"><p className="text-sm text-slate-500 dark:text-slate-400">{label}</p><p className="text-xl font-semibold">{value}%</p></div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${value}%` }} /></div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800"><h2 className="font-semibold">Recent Applications</h2>
            <Link to="/applications" className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-300">View all applications →</Link></div>
          {recent.length ? (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {recent.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="min-w-0"><p className="truncate font-medium">{a.company}</p><p className="truncate text-sm text-slate-500 dark:text-slate-400">{a.role}</p></div>
                  <div className="flex shrink-0 flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-4">
                    <StatusBadge status={a.status} /><span className="text-xs text-slate-500 dark:text-slate-400">{formatDate(a.appliedDate)}</span></div>
                </li>
              ))}
            </ul>
          ) : <EmptyState />}
        </section>

        <section className="card">
          <div className="flex items-center gap-2 border-b border-slate-100 p-5 dark:border-slate-800"><CalendarClock size={18} className="text-indigo-600" /><h2 className="font-semibold">Upcoming Deadlines</h2></div>
          {upcoming.length ? (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {upcoming.map((a) => {
                const days = daysUntil(a.deadline)
                const urgent = days <= 3
                return (
                  <li key={a.id} className="flex items-center justify-between gap-3 px-5 py-3">
                    <div className="min-w-0"><p className="truncate font-medium">{a.company}</p><p className="truncate text-sm text-slate-500 dark:text-slate-400">{a.role}</p></div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs text-slate-500 dark:text-slate-400">Deadline: {formatDate(a.deadline).replace(/, \d{4}/, '')}</p>
                      <span className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${urgent ? 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
                        {days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `${days} days left`}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : <EmptyState title="No upcoming deadlines" text="Add deadlines to your applications to see them here." action={false} />}
        </section>
      </div>
    </div>
  )
}
