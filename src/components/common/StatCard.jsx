export default function StatCard({ label, value, icon: Icon, tone = 'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-300' }) {
  return (
    <div className="card flex items-center justify-between p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-1 text-2xl font-semibold">{value}</p>
      </div>
      <div className={`rounded-lg p-2.5 ${tone}`}><Icon size={20} /></div>
    </div>
  )
}
