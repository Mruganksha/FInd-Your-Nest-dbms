import React, { useEffect, useState } from 'react'
import api from '../api/api'

export default function Profile(){
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [profile, setProfile] = useState(null)

  useEffect(()=>{
    let mounted = true
    setLoading(true)
    api.getProfile().then(data=>{
      if(!mounted) return
      setProfile(data)
      setLoading(false)
    }).catch(err=>{
      console.error(err)
      setError(err.message || 'Could not load profile')
      setLoading(false)
    })
    return ()=>{ mounted = false }
  }, [])

  if (loading) return <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow mt-6">Loading...</div>
  if (error) return <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow mt-6 text-red-600">{error}</div>
  if (!profile) return <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow mt-6">No profile found</div>

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try{
      const updated = await api.updateProfile({ name: profile.name, phone: profile.phone, gender: profile.gender, college_name: profile.college_name, age: profile.age })
      setProfile(updated)
      // keep localStorage in sync for other parts of app
      try{ localStorage.setItem('user', JSON.stringify(updated)) }catch(e){}
    }catch(err){
      console.error(err)
      setError(err.message || 'Save failed')
    }finally{
      setSaving(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow mt-6">
      <form onSubmit={handleSave} className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-2xl font-bold">
            {profile.name ? profile.name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase() : 'U'}
          </div>
          <div className="flex-1">
            <label className="block">
              <span className="text-xs text-gray-600">Full name</span>
              <input value={profile.name} onChange={e=>setProfile({...profile, name: e.target.value})} className="mt-1 block w-full px-3 py-2 border rounded" />
            </label>
            <div className="text-sm text-gray-500 mt-1">{profile.email}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs text-gray-600">Phone</span>
            <input value={profile.phone || ''} onChange={e=>setProfile({...profile, phone: e.target.value})} className="mt-1 block w-full px-3 py-2 border rounded" />
          </label>

          <label className="block">
            <span className="text-xs text-gray-600">Gender</span>
            <select value={profile.gender || ''} onChange={e=>setProfile({...profile, gender: e.target.value})} className="mt-1 block w-full px-3 py-2 border rounded">
              <option value="">Prefer not to say</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label className="block">
            <span className="text-xs text-gray-600">College</span>
            <input value={profile.college_name || ''} onChange={e=>setProfile({...profile, college_name: e.target.value})} className="mt-1 block w-full px-3 py-2 border rounded" />
          </label>

          <label className="block">
            <span className="text-xs text-gray-600">Age</span>
            <input type="number" value={profile.age || ''} onChange={e=>setProfile({...profile, age: e.target.value ? Number(e.target.value) : null})} className="mt-1 block w-full px-3 py-2 border rounded" />
          </label>
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded" disabled={saving}>{saving ? 'Saving...' : 'Save changes'}</button>
        </div>
      </form>
    </div>
  )
}
