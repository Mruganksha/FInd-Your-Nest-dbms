import React, { useEffect, useState } from 'react'
import api from '../api/api'
import ListingCard from '../components/ListingCard'
import FilterBar from '../components/FilterBar'

function LoadingGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
          <div className="h-44 bg-gray-200 rounded mb-3" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  )
}

export default function Home(){
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchListings = async (params) => {
    setLoading(true)
    try {
      const data = await api.getListings(params)
      console.log('getListings response:', data)
      const items = Array.isArray(data)
        ? data
        : Array.isArray(data?.listings)
        ? data.listings
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.result)
        ? data.result
        : []
      setListings(items)
    } catch (err) {
      console.error(err)
      alert('Failed to load listings')
      setListings([])
    } finally { setLoading(false) }
  }

  useEffect(()=>{ fetchListings() }, [])

  const handleFilter = (f) => {
    fetchListings(f)
  }

  const handleWishlist = async (id) => {
    try {
      await api.addWishlist(id)
      alert('Added to wishlist')
    } catch (err) {
      alert(err?.message || 'Failed to add')
    }
  }

  return (
    <div className="space-y-8">
      <section className="relative bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-lg p-8 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Find PGs & Hostels</h1>
            <p className="mt-2 text-indigo-100/90 max-w-xl">Search verified paying guests and hostels near you. Filter by city, rent, and amenities.</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="bg-white/10 px-3 py-1 rounded text-sm">Safe & Verified</div>
              <div className="bg-white/10 px-3 py-1 rounded text-sm">Easy Booking</div>
            </div>
          </div>

          <div className="w-full md:w-96">
  <div className="bg-white p-3 rounded shadow-sm">
    <input
      type="search"
      placeholder="Search by city, locality or landmark"
      className="w-full px-3 py-2 rounded outline-none text-sm text-black border border-gray-200 focus:border-gray-400 transition"
      onKeyDown={(e) => {
        if (e.key === 'Enter') fetchListings({ q: e.target.value })
      }}
    />
    <div className="mt-3 flex gap-2">
      <button
        onClick={() => fetchListings()}
        className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
      >
        Search
      </button>
      <button
        onClick={() => { setListings([]); fetchListings() }}
        className="px-3 py-2 bg-gray-100 text-black text-sm rounded hover:bg-gray-200 transition"
      >
        Reset
      </button>
    </div>
  </div>
</div>

        </div>

        {/* subtle decorative svg */}
        <svg className="absolute right-0 bottom-0 opacity-10 w-64 h-64 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stopColor="#ffffff"/><stop offset="1" stopColor="#000000"/></linearGradient></defs>
          <circle cx="100" cy="100" r="80" fill="url(#g)" />
        </svg>
      </section>

      <div className="max-w-6xl mx-auto">
        <FilterBar onFilter={handleFilter} />

        <div className="mt-6">
          {loading ? (
            <LoadingGrid />
          ) : Array.isArray(listings) && listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map(l => (
                <ListingCard
                  key={l.listing_id || l.id || l._id}
                  listing={l}
                  onWishlist={handleWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-200 p-12 text-center text-gray-600">
              <h3 className="text-lg font-semibold mb-2">No listings found</h3>
              <p className="mb-4">Try adjusting your filters or refresh the page.</p>
              <div className="flex justify-center">
                <button onClick={() => fetchListings()} className="px-4 py-2 bg-indigo-600 text-white rounded">Refresh</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
