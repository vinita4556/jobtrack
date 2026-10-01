import { ExternalLink, Pencil, Trash2 } from 'lucide-react'
import Modal from '../common/Modal'
import StatusBadge from '../common/StatusBadge'
import { formatDate } from '../../utils/helpers'

export default function ApplicationDetails({ app, onClose, onEdit, onDelete }) {
  const rows = [['Location', app.location], ['Job Type', app.jobType], ['Salary', app.salary], ['Applied Date', formatDate(app.appliedDate)], ['Deadline', formatDate(app.deadline)]]
  return (
    <Modal title={app.company} onClose={onClose} footer={<>
      {app.jobUrl && <a href={app.jobUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost"><ExternalLink size={16} />Open Job Posting</a>}
      <button className="btn-ghost" onClick={() => onEdit(app)}><Pencil size={16} />Edit</button>
      <button className="btn-danger" onClick={() => onDelete(app)}><Trash2 size={16} />Delete</button>
    </>}>
      <div className="mb-4 flex items-center justify-between gap-2"><p className="font-medium">{app.role}</p><StatusBadge status={app.status} /></div>
      <dl className="grid grid-cols-2 gap-4 text-sm">
        {rows.map(([label, value]) => (<div key={label}><dt className="text-slate-500 dark:text-slate-400">{label}</dt><dd className="font-medium">{value || '—'}</dd></div>))}
      </dl>
      {app.tags.length > 0 && <div className="mt-4 flex flex-wrap gap-1.5">{app.tags.map((t) => <span key={t} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs dark:bg-slate-800">#{t}</span>)}</div>}
      <div className="mt-4"><p className="text-sm text-slate-500 dark:text-slate-400">Notes</p><p className="mt-1 whitespace-pre-wrap text-sm">{app.notes || '—'}</p></div>
    </Modal>
  )
}
