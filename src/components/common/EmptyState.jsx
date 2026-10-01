import { Link } from 'react-router-dom'
import { Inbox } from 'lucide-react'

export default function EmptyState({ title = 'No applications yet', text = 'Start tracking your job applications and keep your job search organized.', action = true }) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      <div className="mb-4 rounded-full bg-indigo-50 p-4 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"><Inbox size={28} /></div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">{text}</p>
      {action && <Link to="/add" className="btn-primary mt-5">Add your first application</Link>}
    </div>
  )
}
