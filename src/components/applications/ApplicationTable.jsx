import { Eye, MapPin, Pencil, Trash2 } from 'lucide-react'
import StatusBadge from '../common/StatusBadge'
import { formatDate } from '../../utils/helpers'

function Actions({ app, onView, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-1">
      <button className="icon-btn" aria-label={`View ${app.company}`} onClick={() => onView(app)}><Eye size={16} /></button>
      <button className="icon-btn" aria-label={`Edit ${app.company}`} onClick={() => onEdit(app)}><Pencil size={16} /></button>
      <button className="icon-btn hover:!text-red-600" aria-label={`Delete ${app.company}`} onClick={() => onDelete(app)}><Trash2 size={16} /></button>
    </div>
  )
}

export default function ApplicationTable({ apps, ...actions }) {
  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <tr>{['Company', 'Role', 'Location', 'Status', 'Applied Date', 'Job Type', 'Actions'].map((h) => <th key={h} scope="col" className="px-4 py-3 font-medium">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {apps.map((app) => (
              <tr key={app.id} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-3 font-medium">{app.company}</td>
                <td className="px-4 py-3">{app.role}</td>
                <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{app.location || '—'}</td>
                <td className="px-4 py-3"><StatusBadge status={app.status} /></td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-500 dark:text-slate-400">{formatDate(app.appliedDate)}</td>
                <td className="px-4 py-3">{app.jobType}</td>
                <td className="px-4 py-3"><Actions app={app} {...actions} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="divide-y divide-slate-100 dark:divide-slate-800 md:hidden">
        {apps.map((app) => (
          <li key={app.id} className="space-y-2 p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0"><p className="truncate font-medium">{app.company}</p><p className="truncate text-sm text-slate-500 dark:text-slate-400">{app.role}</p></div>
              <StatusBadge status={app.status} />
            </div>
            <p className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400"><MapPin size={12} />{app.location || '—'} · {app.jobType} · {formatDate(app.appliedDate)}</p>
            <Actions app={app} {...actions} />
          </li>
        ))}
      </ul>
    </>
  )
}
