import { useState } from 'react'
import { Download, Moon, Sun, Trash2 } from 'lucide-react'
import Modal from '../components/common/Modal'
import { useApp } from '../context/AppContext'
import { JOB_TYPES, STATUSES, exportCsv } from '../utils/helpers'

const Section = ({ title, children }) => (
  <section className="card p-5 sm:p-6"><h2 className="mb-4 font-semibold">{title}</h2>{children}</section>
)

export default function Settings() {
  const { theme, setTheme, profile, setProfile, applications, clearAll, notify } = useApp()
  const [confirmClear, setConfirmClear] = useState(false)
  const update = (e) => setProfile((p) => ({ ...p, [e.target.name]: e.target.value }))
  const field = (label, name, type = 'text') => (
    <label className="block"><span className="mb-1.5 block text-sm font-medium">{label}</span><input type={type} name={name} value={profile[name]} onChange={update} className="input" /></label>
  )
  const selectField = (label, name, options) => (
    <label className="block"><span className="mb-1.5 block text-sm font-medium">{label}</span>
      <select name={name} value={profile[name]} onChange={update} className="input">{options.map((o) => <option key={o}>{o}</option>)}</select></label>
  )

  const handleExport = () => {
    if (!applications.length) return notify('No applications to export', 'info')
    exportCsv(applications)
    notify('Applications exported')
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <Section title="Appearance">
        <div className="flex gap-3">
          {[['light', Sun, 'Light'], ['dark', Moon, 'Dark']].map(([key, Icon, label]) => (
            <button key={key} aria-pressed={theme === key} onClick={() => setTheme(key)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition ${theme === key ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300' : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800'}`}>
              <Icon size={16} />{label}</button>
          ))}
        </div>
      </Section>
      <Section title="Profile"><div className="grid gap-4 sm:grid-cols-2">{field('Name', 'name')}{field('Email', 'email', 'email')}</div></Section>
      <Section title="Application Preferences"><div className="grid gap-4 sm:grid-cols-2">{selectField('Default job type', 'defaultJobType', JOB_TYPES)}{selectField('Default status', 'defaultStatus', STATUSES)}</div></Section>
      <Section title="Data">
        <div className="flex flex-wrap gap-3">
          <button className="btn-ghost" onClick={handleExport}><Download size={16} />Export Applications</button>
          <button className="btn-danger" onClick={() => setConfirmClear(true)}><Trash2 size={16} />Clear All Data</button>
        </div>
      </Section>
      {confirmClear && (
        <Modal title="Clear all data?" onClose={() => setConfirmClear(false)} footer={<>
          <button className="btn-ghost" onClick={() => setConfirmClear(false)}>Cancel</button>
          <button className="btn-danger" onClick={() => { clearAll(); setConfirmClear(false) }}>Yes, clear everything</button></>}>
          <p className="text-sm text-slate-600 dark:text-slate-300">This permanently deletes all {applications.length} applications, including demo data. This cannot be undone.</p>
        </Modal>
      )}
    </div>
  )
}
