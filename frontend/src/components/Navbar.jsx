import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar(){
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">Find Your Nest</Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hidden md:inline">Home</Link>
          <Link to="/dashboard" className="hidden md:inline">Dashboard</Link>
          {token ? (
            <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 border rounded">Login</Link>
              <Link to="/register" className="px-3 py-1 bg-blue-500 text-white rounded">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
