import React, { useEffect, useState } from 'react'
import api from '../api/api'

export default function Dashboard(){
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWishlist = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getWishlist()
      console.log('getWishlist response:', data)
      const items = Array.isArray(data)
        ? data
        : Array.isArray(data?.wishlist)
        ? data.wishlist
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.result)
        ? data.result
        : []
      setWishlist(items)
    } catch (err) {
      console.error(err)
      setError(err?.message || 'Failed to load wishlist')
      setWishlist([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ fetchWishlist() }, [])

  const handleRemove = async (id) => {
    const prev = wishlist
    setWishlist(prev.filter(i => (i.listing_id || i.id || i._id) !== id))

    try {
      if (api.removeWishlist) {
        await api.removeWishlist(id)
      } else {
        // if backend endpoint not implemented, keep optimistic change
        console.info('removeWishlist API not found — change persisted locally only')
      }
      alert('Removed from wishlist')
    } catch (err) {
      // rollback on error
      setWishlist(prev)
      alert(err?.message || 'Failed to remove from wishlist')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow">
              U
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Your Dashboard</h1>
              <p className="text-sm text-gray-500">Manage your saved PGs & hostels</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-xs text-gray-500">Wishlist</div>
              <div className="text-lg font-semibold text-gray-800">{wishlist?.length ?? 0}</div>
            </div>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700"
              onClick={fetchWishlist}
            >
              Refresh
            </button>
          </div>
        </header>

        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Saved Listings</h2>

          {loading && (
            <div className="py-10 text-center text-gray-500">Loading wishlist...</div>
          )}

          {error && (
            <div className="py-6 text-red-600">Error: {error}</div>
          )}

          {!loading && !error && (
            <>
              {Array.isArray(wishlist) && wishlist.length === 0 ? (
                <div className="py-12 grid place-items-center text-center text-gray-600">
                  <svg width="160" height="120" viewBox="0 0 24 24" fill="none" className="mb-4 opacity-80">
                    <path d="M3 3h18v18H3z" stroke="#CBD5E1" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
                    <path d="M8 11h8" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M8 15h5" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <div className="text-lg font-medium">No items in your wishlist</div>
                  <div className="text-sm mt-2">Go to Home and add listings you like. They'll appear here.</div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.isArray(wishlist) && wishlist.map(item => {
                    const id = item.listing_id || item.id || item._id
                    return (
                      <div key={id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
                        <div className="h-44 bg-gray-100 flex items-center justify-center">
                          {item.image ? (
                            // if your item has image url
                            <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                          ) : (
                            <div className="text-gray-400">No image</div>
                          )}
                        </div>

                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-md font-semibold text-gray-800">{item.name || item.title || 'Listing'}</h3>
                              <p className="text-sm text-gray-500 mt-1">{item.city || item.location || ''}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">Rent</div>
                              <div className="text-lg font-semibold text-indigo-600">₹{item.rent ?? item.price ?? '--'}</div>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center gap-2">
                            <button
                              onClick={() => window.location.href = `/listing/${id}`}
                              className="px-3 py-1.5 bg-gray-100 text-sm rounded text-gray-700 hover:bg-gray-200"
                            >
                              View
                            </button>

                            <button
                              onClick={() => handleRemove(id)}
                              className="px-3 py-1.5 bg-red-50 text-sm rounded text-red-600 border border-red-100 hover:bg-red-100"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  )
}
