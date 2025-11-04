import React, { useEffect, useState } from 'react'
import api from '../api/api'

export default function Roommates() {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({ gender: 'Any', minBudget: '', maxBudget: '', location: '' })
  const [showForm, setShowForm] = useState(false)
  const [myProfile, setMyProfile] = useState(null)
  const [saving, setSaving] = useState(false)

  // form fields
  const [budget, setBudget] = useState('')
  const [gender, setGender] = useState('Male')
  const [location, setLocation] = useState('')
  const [college, setCollege] = useState('')
  const [habits, setHabits] = useState('')
  const [pref, setPref] = useState('')

  const loadProfiles = async () => {
    setLoading(true)
    try {
      const data = await api.getRoommates(filters)
      setProfiles(Array.isArray(data) ? data : [])
    } catch (err) {
      alert(err.message || 'Failed to load roommate profiles')
      setProfiles([])
    } finally {
      setLoading(false)
    }
  }

  const checkMyProfile = async () => {
    try {
      const p = await api.getMyRoommateProfile()
      if (!p) setShowForm(true) // auto popup
      else setMyProfile(p)
    } catch (err) {
      console.log('User not logged in or no profile yet')
    }
  }

  useEffect(() => {
    loadProfiles()
    checkMyProfile()
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.saveRoommateProfile({
        budget, gender, preferred_location: location, college_name: college,
        lifestyle_habits: habits, roommate_pref: pref
      })
      alert('Profile saved ✅')
      setShowForm(false)
      loadProfiles()
    } catch (err) {
      alert(err.message || 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Find a Roommate</h1>
      <p className="text-gray-600">See people looking for roommates based on budget, location & lifestyle.</p>

      {/* FILTER BAR */}
      <div className="bg-white p-4 shadow rounded flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-xs text-gray-500">Gender</label>
          <select className="border p-2 rounded w-32"
            value={filters.gender}
            onChange={e => setFilters(prev => ({ ...prev, gender: e.target.value }))}>
            <option>Any</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-500">Min Budget</label>
          <input type="number" className="border p-2 rounded w-32"
            value={filters.minBudget}
            onChange={e => setFilters(prev => ({ ...prev, minBudget: e.target.value }))} />
        </div>

        <div>
          <label className="text-xs text-gray-500">Max Budget</label>
          <input type="number" className="border p-2 rounded w-32"
            value={filters.maxBudget}
            onChange={e => setFilters(prev => ({ ...prev, maxBudget: e.target.value }))} />
        </div>

        <div>
          <label className="text-xs text-gray-500">Location</label>
          <input type="text" className="border p-2 rounded w-48"
            value={filters.location}
            onChange={e => setFilters(prev => ({ ...prev, location: e.target.value }))} />
        </div>

        <button onClick={loadProfiles} className="px-4 py-2 bg-indigo-600 text-white rounded">Apply</button>
      </div>

      {/* LIST */}
      {loading ? (
        <div className="text-center text-gray-500 py-8">Loading...</div>
      ) : profiles.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No roommate profiles found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map(p => (
            <div key={p.profile_id} className="bg-white rounded shadow p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
              <div className="text-sm text-gray-500">Budget: ₹{p.budget}</div>
              <div className="text-sm text-gray-500">Preferred Location: {p.preferred_location}</div>
              <div className="text-sm text-gray-500">College: {p.college_name}</div>

              <div className="text-sm text-gray-500">Habits: {p.lifestyle_habits}</div>
              <div className="text-sm text-gray-500">Prefers: {p.roommate_pref}</div>

              <div className="text-sm mt-2">
                <div className="font-medium text-gray-600">Contact:</div>
                <div>{p.email}</div>
                <div>{p.phone}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* POPUP FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Create Roommate Profile</h2>

            <form className="space-y-3" onSubmit={handleSave}>
              <input type="number" placeholder="Budget (₹)" className="w-full border p-2 rounded"
                value={budget} onChange={e => setBudget(e.target.value)} required />

              <select className="w-full border p-2 rounded"
                value={gender} onChange={e => setGender(e.target.value)}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <input type="text" placeholder="Preferred Location" className="w-full border p-2 rounded"
                value={location} onChange={e => setLocation(e.target.value)} />

              <input type="text" placeholder="College Name" className="w-full border p-2 rounded"
                value={college} onChange={e => setCollege(e.target.value)} />

              <textarea placeholder="Lifestyle habits" className="w-full border p-2 rounded"
                value={habits} onChange={e => setHabits(e.target.value)} />

              <textarea placeholder="Roommate preferences" className="w-full border p-2 rounded"
                value={pref} onChange={e => setPref(e.target.value)} />

              <div className="flex justify-end gap-3">
                <button type="button" className="px-3 py-2 border rounded"
                  onClick={() => setShowForm(false)}>Cancel</button>

                <button type="submit" disabled={saving}
                  className="px-4 py-2 bg-indigo-600 text-white rounded">
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
