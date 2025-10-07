import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Student')
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    try {
      await api.register({ name, email, password, role })
      alert('Registered (mock)')
      navigate('/login')
    } catch (err) {
      alert('Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        <form onSubmit={handle} className="space-y-3">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full p-2 border rounded" />
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" />
          <select value={role} onChange={e=>setRole(e.target.value)} className="w-full p-2 border rounded">
            <option>Student</option>
            <option>Owner</option>
          </select>
          <button className="w-full bg-blue-500 text-white py-2 rounded">Register</button>
        </form>
      </div>
    </div>
  )
}
