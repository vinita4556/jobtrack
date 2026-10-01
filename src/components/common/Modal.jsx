import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ title, onClose, children, footer }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 sm:items-center" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}
        className="card max-h-[90vh] w-full max-w-lg animate-pop overflow-y-auto p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button className="icon-btn -mr-2 -mt-2" onClick={onClose} aria-label="Close dialog"><X size={18} /></button>
        </div>
        {children}
        {footer && <div className="mt-6 flex flex-wrap justify-end gap-2">{footer}</div>}
      </div>
    </div>
  )
}
