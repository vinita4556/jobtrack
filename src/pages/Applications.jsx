import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LayoutGrid, List, Plus, Search } from 'lucide-react'
import ApplicationTable from '../components/applications/ApplicationTable'
import KanbanBoard from '../components/applications/KanbanBoard'
import ApplicationDetails from '../components/applications/ApplicationDetails'
import Modal from '../components/common/Modal'
import EmptyState from '../components/common/EmptyState'
import { useApp } from '../context/AppContext'
import { JOB_TYPES, STATUSES, matchesQuery } from '../utils/helpers'

const SORTS = {
  newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
  oldest: (a, b) => a.createdAt.localeCompare(b.createdAt),
  company: (a, b) => a.company.localeCompare(b.company),
}

export default function Applications() {
  const { applications, query, setQuery, deleteApplication } = useApp()
  const navigate = useNavigate()
  const [view, setView] = useState('table')
  const [filters, setFilters] = useState({ status: 'All', jobType: 'All', location: 'All' })
  const [sort, setSort] = useState('newest')
  const [selected, setSelected] = useState(null)
  const [toDelete, setToDelete] = useState(null)

  const locations = useMemo(() => [...new Set(applications.map((a) => a.location).filter(Boolean))].sort(), [applications])
  const results = useMemo(() => applications
    .filter((a) => matchesQuery(a, query))
    .filter((a) => (filters.status === 'All' || a.status === filters.status) && (filters.jobType === 'All' || a.jobType === filters.jobType) && (filters.location === 'All' || a.location === filters.location))
    .sort(SORTS[sort]), [applications, query, filters, sort])

  const setFilter = (key) => (e) => setFilters((f) => ({ ...f, [key]: e.target.value }))
  const select = (label, value, onChange, options) => (
    <select aria-label={label} value={value} onChange={onChange} className="input w-auto min-w-[8.5rem] flex-1 sm:flex-none">
      {options.map(([v, text]) => <option key={v} value={v}>{text}</option>)}
    </select>
  )
  const withAll = (label, list) => [['All', `All ${label}`], ...list.map((v) => [v, v])]
  const edit = (app) => navigate(`/edit/${app.id}`)
  const confirmDelete = () => { deleteApplication(toDelete.id); setToDelete(null); setSelected(null) }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Applications</h1>
        <Link to="/add" className="btn-primary"><Plus size={16} />Add Application</Link>
      </div>
      <div className="card flex flex-wrap items-center gap-2 p-3">
        <div className="relative min-w-[12rem] flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="search" aria-label="Filter applications" className="input pl-9" placeholder="Search applications…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        {select('Status', filters.status, setFilter('status'), withAll('Statuses', STATUSES))}
        {select('Job type', filters.jobType, setFilter('jobType'), withAll('Types', JOB_TYPES))}
        {select('Location', filters.location, setFilter('location'), withAll('Locations', locations))}
        {select('Sort by', sort, (e) => setSort(e.target.value), [['newest', 'Newest'], ['oldest', 'Oldest'], ['company', 'Company A-Z']])}
        <div className="flex rounded-lg border border-slate-200 p-0.5 dark:border-slate-700" role="group" aria-label="View mode">
          {[['table', List, 'Table view'], ['board', LayoutGrid, 'Board view']].map(([key, Icon, label]) => (
            <button key={key} aria-label={label} aria-pressed={view === key} onClick={() => setView(key)}
              className={`rounded-md p-1.5 transition ${view === key ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}><Icon size={16} /></button>
          ))}
        </div>
      </div>

      {!applications.length ? <div className="card"><EmptyState /></div>
        : !results.length ? <div className="card"><EmptyState title="No matching applications" text="Try adjusting your search or filters." action={false} /></div>
        : view === 'table' ? <div className="card overflow-hidden"><ApplicationTable apps={results} onView={setSelected} onEdit={edit} onDelete={setToDelete} /></div>
        : <KanbanBoard apps={results} onView={setSelected} />}

      {selected && <ApplicationDetails app={selected} onClose={() => setSelected(null)} onEdit={edit} onDelete={setToDelete} />}
      {toDelete && (
        <Modal title="Delete application?" onClose={() => setToDelete(null)} footer={<>
          <button className="btn-ghost" onClick={() => setToDelete(null)}>Cancel</button>
          <button className="btn-danger" onClick={confirmDelete}>Delete</button></>}>
          <p className="text-sm text-slate-600 dark:text-slate-300">This will permanently remove your application to <strong>{toDelete.company}</strong>.</p>
        </Modal>
      )}
    </div>
  )
}
