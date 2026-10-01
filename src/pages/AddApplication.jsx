import { Navigate, useNavigate, useParams } from 'react-router-dom'
import ApplicationForm from '../components/applications/ApplicationForm'
import { useApp } from '../context/AppContext'

export default function AddApplication() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { applications, addApplication, updateApplication } = useApp()
  const existing = id ? applications.find((a) => a.id === id) : null
  if (id && !existing) return <Navigate to="/applications" replace />

  const handleSubmit = (data) => {
    existing ? updateApplication(existing.id, data) : addApplication(data)
    navigate('/applications')
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold">{existing ? 'Edit Application' : 'Add Application'}</h1>
      <p className="mb-6 mt-1 text-sm text-slate-500 dark:text-slate-400">{existing ? `Update details for ${existing.company}.` : 'Log a new job application.'}</p>
      <ApplicationForm key={existing?.id || 'new'} initial={existing} onSubmit={handleSubmit} submitLabel={existing ? 'Save Changes' : 'Add Application'} />
    </div>
  )
}
