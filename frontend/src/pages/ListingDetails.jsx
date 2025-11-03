import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/api'

export default function ListingDetails(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    api.getListingById(id)
      .then(data => { if (mounted) setListing(data) })
      .catch(()=> { if (mounted) alert('Failed to load') })
      .finally(()=> { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [id])

  const handleAddWishlist = async () => {
    try {
      await api.addWishlist(id)
      alert('Added to wishlist')
    } catch (err) {
      alert(err?.message || 'Failed to add')
    }
  }

  if(loading) return <div className="py-12 text-center text-gray-600">Loading listing...</div>
  if(!listing) return <div className="py-12 text-center text-red-600">Listing not found.</div>

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:underline mb-4">&larr; Back</button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="rounded-lg overflow-hidden bg-gray-100 h-64 flex items-center justify-center">
            {listing.images && listing.images.length > 0 ? (
              <img src={listing.images[0]} alt={listing.name} className="object-cover w-full h-full" />
            ) : (
              <div className="text-gray-400">No image available</div>
            )}
          </div>

          <div className="mt-4 space-y-3">
            <h1 className="text-2xl font-bold text-gray-800">{listing.name || 'Listing'}</h1>
            <div className="text-sm text-gray-500">{listing.address} • {listing.city}</div>
            <div className="mt-2 text-gray-700">{listing.description || 'No description provided.'}</div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {(listing.amenities && listing.amenities.length > 0) ? (
                  listing.amenities.map((a, i) => (
                    <span key={i} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">{a}</span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">Not listed</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-lg border p-4 flex flex-col gap-4">
          <div>
            <div className="text-sm text-gray-500">Rent / month</div>
            <div className="text-2xl font-bold text-indigo-600">₹{listing.rent ?? listing.price ?? '--'}</div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Gender preference</div>
            <div className="text-sm text-gray-700">{listing.gender_preference || 'Any'}</div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Available rooms</div>
            <div className="text-sm text-gray-700">{listing.available_rooms ?? 'N/A'}</div>
          </div>

          <div className="mt-2">
            <button
              onClick={() => window.location.href = `/dashboard`}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded mb-2 hover:bg-indigo-700"
            >
              Book / Contact
            </button>
            <button
              onClick={handleAddWishlist}
              className="w-full px-4 py-2 border border-gray-200 rounded text-gray-700 hover:bg-gray-50"
            >
              Add to wishlist
            </button>
          </div>

          <div className="text-xs text-gray-400 mt-auto">Listed by: {listing.owner_name || 'Owner'}</div>
        </aside>
      </div>
    </div>
  )
}
