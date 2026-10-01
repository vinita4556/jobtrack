import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import ToastContainer from '../common/Toast'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <div className="min-h-screen">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="lg:pl-64">
        <Navbar onMenu={() => setMenuOpen(true)} />
        <main key={pathname} className="mx-auto max-w-7xl animate-fade overflow-x-hidden p-4 sm:p-6"><Outlet /></main>
      </div>
      <ToastContainer />
    </div>
  )
}
