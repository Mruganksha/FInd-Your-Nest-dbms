import React, { useState } from 'react'

export default function FilterBar({ onFilter }) {
  const [city, setCity] = useState('')
  const [minRent, setMinRent] = useState('')
  const [maxRent, setMaxRent] = useState('')
  const [sort, setSort] = useState('relevance')

  const apply = (e) => {
    e.preventDefault()
    onFilter && onFilter({
      city: city.trim() || undefined,
      minRent: minRent ? Number(minRent) : undefined,
      maxRent: maxRent ? Number(maxRent) : undefined,
      sort
    })
  }

  const reset = () => {
    setCity('')
    setMinRent('')
    setMaxRent('')
    setSort('relevance')
    onFilter && onFilter({})
  }

  return (
    <form onSubmit={apply} className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:items-end gap-3">
      <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-gray-600">City</label>
          <input
            value={city}
            onChange={e => setCity(e.target.value)}
            className="block w-full p-2 border rounded focus:ring-1 focus:ring-indigo-300"
            placeholder="e.g. Pune"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600">Min Rent</label>
          <input
            value={minRent}
            onChange={e => setMinRent(e.target.value.replace(/[^\d]/g, ''))}
            className="block w-full p-2 border rounded"
            placeholder="0"
            inputMode="numeric"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600">Max Rent</label>
          <input
            value={maxRent}
            onChange={e => setMaxRent(e.target.value.replace(/[^\d]/g, ''))}
            className="block w-full p-2 border rounded"
            placeholder="10000"
            inputMode="numeric"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:ml-2">
        <div>
          <label className="text-xs text-gray-600">Sort</label>
          <select value={sort} onChange={e => setSort(e.target.value)} className="p-2 border rounded bg-white">
            <option value="relevance">Relevance</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Apply
          </button>
          <button type="button" onClick={reset} className="px-3 py-2 border rounded text-sm bg-gray-50 hover:bg-gray-100">
            Reset
          </button>
        </div>
      </div>
    </form>
  )
}
