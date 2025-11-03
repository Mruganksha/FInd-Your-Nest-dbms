import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    setError(null)
    if (!email || !password) {
      setError('Please enter email and password.')
      return
    }
    setLoading(true)
    try {
      const res = await api.login({ email, password })
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
      navigate('/')
    } catch (err) {
      console.error(err)
      setError(err?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sign in</h2>
        <p className="text-sm text-gray-500 mb-4">Welcome back — sign in to manage your wishlist and bookings.</p>

        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

        <form onSubmit={handle} className="space-y-3">
          <label className="block">
            <span className="text-xs text-gray-600">Email</span>
            <input
              type="email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded focus:ring-1 focus:ring-indigo-300"
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="block">
            <span className="text-xs text-gray-600">Password</span>
            <input
              type="password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded focus:ring-1 focus:ring-indigo-300"
              placeholder="••••••••"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
        </div>
      </div>
    </div>
  )
}