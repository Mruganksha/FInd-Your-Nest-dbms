import React from 'react'

export default function Profile(){
  let user = null
  try { user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null } catch(e) { user = null }

  if(!user) return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow mt-6">
      <div className="text-center text-gray-600">No user info found. Please login.</div>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow mt-6">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-2xl font-bold">
          {user.name ? user.name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase() : 'U'}
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
          <div className="text-sm text-gray-500">{user.email}</div>
          <div className="text-sm text-gray-500">{user.phone || 'Phone not provided'}</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <div className="text-xs text-gray-500">Role</div>
          <div className="font-medium">{user.role || 'N/A'}</div>
        </div>
        <div className="p-4 border rounded">
          <div className="text-xs text-gray-500">Gender</div>
          <div className="font-medium">{user.gender || 'N/A'}</div>
        </div>
        <div className="p-4 border rounded">
          <div className="text-xs text-gray-500">College</div>
          <div className="font-medium">{user.college_name || 'N/A'}</div>
        </div>
        <div className="p-4 border rounded">
          <div className="text-xs text-gray-500">Age</div>
          <div className="font-medium">{user.age ?? 'N/A'}</div>
        </div>
      </div>
    </div>
  )
}
