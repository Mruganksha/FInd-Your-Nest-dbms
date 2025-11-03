import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Student')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [collegeName, setCollegeName] = useState('')
  const [age, setAge] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    setError(null)
    if (!name || !email || !password) {
      setError('Please fill all required fields.')
      return
    }
    setLoading(true)
    try {
      await api.register({ name, email, password, role, phone, gender, college_name: collegeName, age: age ? Number(age) : null })
      navigate('/login')
    } catch (err) {
      console.error(err)
      setError(err?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Create an account</h2>
        <p className="text-sm text-gray-500 mb-4">Register to save listings and contact owners.</p>

        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

        <form onSubmit={handle} className="space-y-3">
          <label className="block">
            <span className="text-xs text-gray-600">Full name</span>
            <input
              value={name}
              onChange={e=>setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded focus:ring-1 focus:ring-indigo-300"
              placeholder="Your full name"
              required
            />
          </label>

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
              placeholder="Choose a password"
              required
            />
          </label>

          <label className="block">
            <span className="text-xs text-gray-600">Role</span>
            <select value={role} onChange={e=>setRole(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded">
              <option>Student</option>
              <option>Owner</option>
            </select>
          </label>

          <label className="block">
            <span className="text-xs text-gray-600">Phone</span>
            <input
              value={phone}
              onChange={e=>setPhone(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded focus:ring-1 focus:ring-indigo-300"
              placeholder="Phone number"
            />
          </label>

          <label className="block">
            <span className="text-xs text-gray-600">Gender</span>
            <select value={gender} onChange={e=>setGender(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded">
              <option value="">Prefer not to say</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label className="block">
            <span className="text-xs text-gray-600">College / Institution</span>
            <input
              value={collegeName}
              onChange={e=>setCollegeName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded focus:ring-1 focus:ring-indigo-300"
              placeholder="College or Institution"
            />
          </label>

          <label className="block">
            <span className="text-xs text-gray-600">Age</span>
            <input
              type="number"
              value={age}
              onChange={e=>setAge(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded focus:ring-1 focus:ring-indigo-300"
              placeholder="Age"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <span>Already have an account? </span>
          <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  )
}