import { useState } from 'react'
import { Calendar, MapPin } from 'lucide-react'
import { STATUSES, formatDate } from '../../utils/helpers'
import { useApp } from '../../context/AppContext'

export default function KanbanBoard({ apps, onView }) {
  const { updateApplication } = useApp()
  const [overColumn, setOverColumn] = useState(null)

  const move = (id, status) => updateApplication(id, { status }, true)

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {STATUSES.map((status) => {
        const items = apps.filter((a) => a.status === status)
        return (
          <section key={status} aria-label={`${status} column`}
            onDragOver={(e) => { e.preventDefault(); setOverColumn(status) }}
            onDragLeave={() => setOverColumn(null)}
            onDrop={(e) => { move(e.dataTransfer.getData('text/plain'), status); setOverColumn(null) }}
            className={`rounded-xl border p-3 transition ${overColumn === status ? 'border-indigo-400 bg-indigo-50/60 dark:bg-indigo-500/10' : 'border-slate-200 bg-slate-100/60 dark:border-slate-800 dark:bg-slate-900/50'}`}>
            <h3 className="mb-3 flex items-center justify-between px-1 text-sm font-semibold">{status}
              <span className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">{items.length}</span></h3>
            <div className="space-y-3">
              {items.map((app) => (
                <article key={app.id} draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', app.id)}
                  className="card cursor-grab space-y-2 p-3 transition hover:shadow-md active:cursor-grabbing">
                  <button className="block w-full text-left" onClick={() => onView(app)}>
                    <p className="font-medium">{app.company}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{app.role}</p>
                  </button>
                  <p className="flex flex-wrap items-center gap-x-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><MapPin size={12} />{app.location || '—'}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(app.appliedDate)}</span>
                  </p>
                  <select aria-label={`Change status for ${app.company}`} value={app.status} onChange={(e) => move(app.id, e.target.value)} className="input py-1 text-xs">
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </article>
              ))}
              {!items.length && <p className="py-4 text-center text-xs text-slate-400">Drop applications here</p>}
            </div>
          </section>
        )
      })}
    </div>
  )
}
