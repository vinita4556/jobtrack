export const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected']
export const JOB_TYPES = ['Full-time', 'Part-time', 'Internship', 'Contract', 'Remote']

export const formatDate = (value) =>
  value ? new Date(value.length === 10 ? value + 'T00:00:00' : value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

export const daysUntil = (value) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((new Date(value + 'T00:00:00') - today) / 86400000)
}

export const percent = (part, total) => (total ? Math.round((part / total) * 100) : 0)

export const computeStats = (apps) => {
  const count = (status) => apps.filter((a) => a.status === status).length
  const total = apps.length
  const [applied, interviews, offers, rejected] = STATUSES.map(count)
  return {
    total, applied, interviews, offers, rejected,
    interviewRate: percent(interviews + offers, total),
    responseRate: percent(total - applied, total),
    offerRate: percent(offers, total),
    rejectionRate: percent(rejected, total),
  }
}

export const groupCount = (apps, key) => {
  const counts = apps.reduce((acc, a) => {
    const name = a[key] || 'Unspecified'
    acc[name] = (acc[name] || 0) + 1
    return acc
  }, {})
  return Object.entries(counts).map(([name, value]) => ({ name, value }))
}

export const matchesQuery = (app, query) => {
  const q = query.trim().toLowerCase()
  return !q || [app.company, app.role, app.location, ...(app.tags || [])].some((v) => (v || '').toLowerCase().includes(q))
}

export const exportCsv = (apps) => {
  const headers = ['company', 'role', 'location', 'jobType', 'salary', 'status', 'appliedDate', 'deadline', 'jobUrl', 'tags', 'notes']
  const escape = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const rows = apps.map((a) => headers.map((h) => escape(h === 'tags' ? a.tags.join('; ') : a[h])).join(','))
  const blob = new Blob([[headers.join(','), ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'jobtrack-applications.csv'
  link.click()
  URL.revokeObjectURL(link.href)
}
