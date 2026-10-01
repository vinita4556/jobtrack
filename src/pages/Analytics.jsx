import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Briefcase, Gift, MessageSquare, XCircle } from 'lucide-react'
import StatCard from '../components/common/StatCard'
import EmptyState from '../components/common/EmptyState'
import { useApp } from '../context/AppContext'
import { STATUSES, computeStats, groupCount } from '../utils/helpers'

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#06b6d4']
const STATUS_COLORS = { Applied: '#3b82f6', Interview: '#f59e0b', Offer: '#10b981', Rejected: '#ef4444' }

function ChartCard({ title, children }) {
  return (
    <section className="card p-5">
      <h2 className="mb-4 font-semibold">{title}</h2>
      <div className="h-64 text-xs">{children}</div>
    </section>
  )
}

export default function Analytics() {
  const { applications, theme } = useApp()
  const stats = useMemo(() => computeStats(applications), [applications])
  const overTime = useMemo(() => {
    const counts = applications.reduce((acc, a) => { const key = a.appliedDate.slice(0, 7); acc[key] = (acc[key] || 0) + 1; return acc }, {})
    return Object.keys(counts).sort().map((key) => ({ name: new Date(key + '-01T00:00:00').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }), value: counts[key] }))
  }, [applications])
  const byStatus = useMemo(() => STATUSES.map((name) => ({ name, value: applications.filter((a) => a.status === name).length })), [applications])
  const byType = useMemo(() => groupCount(applications, 'jobType'), [applications])
  const byLocation = useMemo(() => groupCount(applications, 'location'), [applications])

  if (!applications.length) return <div className="card"><EmptyState /></div>

  const dark = theme === 'dark'
  const axis = dark ? '#94a3b8' : '#64748b'
  const grid = dark ? '#1e293b' : '#e2e8f0'
  const tooltip = { contentStyle: { background: dark ? '#0f172a' : '#fff', border: `1px solid ${grid}`, borderRadius: 8, color: dark ? '#f1f5f9' : '#0f172a' } }
  const cartesian = (Chart, data, children) => (
    <ResponsiveContainer>
      <Chart data={data} margin={{ left: -20, right: 8 }}>
        <CartesianGrid stroke={grid} strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" stroke={axis} tickLine={false} />
        <YAxis stroke={axis} allowDecimals={false} tickLine={false} />
        <Tooltip {...tooltip} cursor={{ fill: grid, opacity: 0.4 }} />
        {children}
      </Chart>
    </ResponsiveContainer>
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Analytics</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Applications" value={stats.total} icon={Briefcase} />
        <StatCard label="Interview Rate" value={`${stats.interviewRate}%`} icon={MessageSquare} tone="text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-300" />
        <StatCard label="Offer Rate" value={`${stats.offerRate}%`} icon={Gift} tone="text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-300" />
        <StatCard label="Rejection Rate" value={`${stats.rejectionRate}%`} icon={XCircle} tone="text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-300" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Applications Over Time">
          {cartesian(LineChart, overTime, <Line type="monotone" dataKey="value" name="Applications" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} />)}
        </ChartCard>
        <ChartCard title="Applications by Status">
          {cartesian(BarChart, byStatus, <Bar dataKey="value" name="Applications" radius={[6, 6, 0, 0]}>{byStatus.map((d) => <Cell key={d.name} fill={STATUS_COLORS[d.name]} />)}</Bar>)}
        </ChartCard>
        <ChartCard title="Applications by Job Type">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={byType} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3} stroke="none">{byType.map((d, i) => <Cell key={d.name} fill={COLORS[i % COLORS.length]} />)}</Pie>
              <Tooltip {...tooltip} /><Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Applications by Location">
          {cartesian(BarChart, byLocation, <Bar dataKey="value" name="Applications" fill="#6366f1" radius={[6, 6, 0, 0]} />)}
        </ChartCard>
      </div>
    </div>
  )
}
