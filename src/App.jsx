import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'
import AddApplication from './pages/AddApplication'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/add" element={<AddApplication />} />
        <Route path="/edit/:id" element={<AddApplication />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}
