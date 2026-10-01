import { CheckCircle2, Info, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function ToastContainer() {
  const { toasts, dismissToast } = useApp()
  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="card flex animate-fade items-center gap-3 px-4 py-3 text-sm shadow-lg">
          {t.type === 'success' ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Info size={18} className="text-indigo-500" />}
          <span>{t.message}</span>
          <button className="icon-btn -mr-2 p-1" onClick={() => dismissToast(t.id)} aria-label="Dismiss notification"><X size={14} /></button>
        </div>
      ))}
    </div>
  )
}
