import React, { useState } from 'react'

export default function FilterBar({onFilter}){
  const [city, setCity] = useState('')
  const [minRent, setMinRent] = useState('')
  const [maxRent, setMaxRent] = useState('')

  const apply = (e) => {
    e.preventDefault()
    onFilter({ city, minRent, maxRent })
  }

  return (
    <form onSubmit={apply} className="bg-white p-4 rounded-lg shadow flex gap-3 items-end">
      <div>
        <label className="text-xs text-gray-600">City</label>
        <input value={city} onChange={e=>setCity(e.target.value)} className="block w-40 p-2 border rounded" placeholder="e.g. Pune" />
      </div>
      <div>
        <label className="text-xs text-gray-600">Min Rent</label>
        <input value={minRent} onChange={e=>setMinRent(e.target.value)} className="block w-28 p-2 border rounded" placeholder="0" />
      </div>
      <div>
        <label className="text-xs text-gray-600">Max Rent</label>
        <input value={maxRent} onChange={e=>setMaxRent(e.target.value)} className="block w-28 p-2 border rounded" placeholder="10000" />
      </div>
      <div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Apply</button>
      </div>
    </form>
  )
}
