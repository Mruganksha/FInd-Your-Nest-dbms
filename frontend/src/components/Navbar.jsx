import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const token = localStorage.getItem('token')
  const rawUser = localStorage.getItem('user')
  const [user, setUser] = useState(null)

  useEffect(() => {
    try {
      setUser(rawUser ? JSON.parse(rawUser) : null)
    } catch {
      setUser(null)
    }
  }, [rawUser])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const initials = user?.name
    ? user.name.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase()
    : 'U'

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-semibold shadow">
              N
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-gray-800">Find Your Nest</div>
              <div className="text-xs text-gray-500">PGs & Hostels near you</div>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</Link>
          <Link to="/roommates" className="hover:underline">Roommates</Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop auth / avatar */}
          {token ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(v => !v)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded shadow-sm hover:shadow-md"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center text-sm font-medium">
                  {initials}
                </div>
                <div className="hidden sm:block text-sm text-gray-700">{user?.name?.split(' ')[0] || 'User'}</div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-md z-20">
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Dashboard</Link>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/login" className="px-3 py-1 text-sm border rounded text-gray-700 hover:bg-gray-50">Login</Link>
              <Link to="/register" className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">Register</Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-3 space-y-2">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block text-gray-700 py-1">Home</Link>
            <Link to="/listing" onClick={() => setMobileOpen(false)} className="block text-gray-700 py-1">Browse</Link>
            <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block text-gray-700 py-1">Dashboard</Link>

            {token ? (
              <>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="block text-gray-700 py-1">Profile</Link>
                <button
                  onClick={() => { setMobileOpen(false); handleLogout() }}
                  className="w-full text-left text-red-600 py-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="pt-2 flex gap-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center px-3 py-2 border rounded">Login</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 text-center px-3 py-2 bg-indigo-600 text-white rounded">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}