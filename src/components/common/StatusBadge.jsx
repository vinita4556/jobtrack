const STYLES = {
  Applied: 'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-300',
  Interview: 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-300',
  Offer: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-300',
  Rejected: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-300',
}

export default function StatusBadge({ status }) {
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${STYLES[status]}`}>{status}</span>
}
