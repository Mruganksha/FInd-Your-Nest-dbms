import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ListingDetails from './pages/ListingDetails'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      </main>
    </div>
  )
}
