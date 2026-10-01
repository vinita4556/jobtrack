import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { JOB_TYPES, STATUSES } from '../../utils/helpers'

const Field = ({ label, error, required, children, className = '' }) => (
  <label className={`block ${className}`}>
    <span className="mb-1.5 block text-sm font-medium">{label}{required && <span className="text-red-500"> *</span>}</span>
    {children}
    {error && <span role="alert" className="mt-1 block text-xs text-red-500">{error}</span>}
  </label>
)

export default function ApplicationForm({ initial, onSubmit, submitLabel }) {
  const { profile } = useApp()
  const navigate = useNavigate()
  const [values, setValues] = useState(() => initial
    ? { ...initial, tags: initial.tags.join(', ') }
    : { company: '', role: '', location: '', jobType: profile.defaultJobType, salary: '', status: profile.defaultStatus, appliedDate: new Date().toISOString().slice(0, 10), deadline: '', jobUrl: '', tags: '', notes: '' })
  const [errors, setErrors] = useState({})

  const set = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!values.company.trim()) next.company = 'Company name is required'
    if (!values.role.trim()) next.role = 'Job role is required'
    if (!values.status) next.status = 'Please select a status'
    if (!values.appliedDate) next.appliedDate = 'Applied date is required'
    if (values.jobUrl && !/^https?:\/\/\S+\.\S+/.test(values.jobUrl)) next.jobUrl = 'Enter a valid URL starting with http:// or https://'
    if (values.deadline && values.appliedDate && values.deadline < values.appliedDate) next.deadline = 'Deadline cannot be before the applied date'
    return next
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) return
    onSubmit({ ...values, company: values.company.trim(), role: values.role.trim(), tags: values.tags.split(',').map((t) => t.trim()).filter(Boolean) })
  }

  const select = (name, options) => (
    <select name={name} value={values[name]} onChange={set} className="input">{options.map((o) => <option key={o}>{o}</option>)}</select>
  )

  return (
    <form onSubmit={handleSubmit} noValidate className="card grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
      <Field label="Company Name" required error={errors.company}><input name="company" value={values.company} onChange={set} className="input" placeholder="e.g. Google" /></Field>
      <Field label="Job Role" required error={errors.role}><input name="role" value={values.role} onChange={set} className="input" placeholder="e.g. Frontend Developer" /></Field>
      <Field label="Location"><input name="location" value={values.location} onChange={set} className="input" placeholder="e.g. Bengaluru, India" /></Field>
      <Field label="Job Type">{select('jobType', JOB_TYPES)}</Field>
      <Field label="Salary"><input name="salary" value={values.salary} onChange={set} className="input" placeholder="e.g. ₹12 LPA" /></Field>
      <Field label="Status" required error={errors.status}>{select('status', STATUSES)}</Field>
      <Field label="Applied Date" required error={errors.appliedDate}><input type="date" name="appliedDate" value={values.appliedDate} onChange={set} className="input" /></Field>
      <Field label="Deadline" error={errors.deadline}><input type="date" name="deadline" value={values.deadline} onChange={set} className="input" /></Field>
      <Field label="Job URL" error={errors.jobUrl} className="sm:col-span-2"><input name="jobUrl" value={values.jobUrl} onChange={set} className="input" placeholder="https://company.com/careers/role" /></Field>
      <Field label="Tags (comma separated)" className="sm:col-span-2"><input name="tags" value={values.tags} onChange={set} className="input" placeholder="react, remote, startup" /></Field>
      <Field label="Notes" className="sm:col-span-2"><textarea name="notes" rows={4} value={values.notes} onChange={set} className="input" placeholder="Referrals, interview prep, contacts…" /></Field>
      <div className="flex justify-end gap-2 sm:col-span-2">
        <button type="button" className="btn-ghost" onClick={() => navigate(-1)}>Cancel</button>
        <button type="submit" className="btn-primary">{submitLabel}</button>
      </div>
    </form>
  )
}
