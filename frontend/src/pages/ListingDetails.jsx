import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/api'

export default function ListingDetails(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showBooking, setShowBooking] = useState(false)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [bookingResult, setBookingResult] = useState(null)
  const [submitting, setSubmitting] = useState(false)

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
      try { localStorage.setItem('wishlist_last_updated', Date.now().toString()) } catch (e) {}
      try { window.dispatchEvent(new CustomEvent('wishlist:updated')) } catch (e) {}
      alert('Added to wishlist')
    } catch (err) {
      alert(err?.message || 'Failed to add')
    }
  }

  const openBooking = () => {
    setBookingResult(null)
    setShowBooking(true)
  }

  const handleCreateBooking = async (e) => {
    e.preventDefault()
    if (!checkIn || !checkOut) return alert('Please select check-in and check-out dates')
    setSubmitting(true)
    try {
      const res = await api.createBooking({ listing_id: id, check_in_date: checkIn, check_out_date: checkOut })
      // backend returns { booking }
      setBookingResult(res.booking || res)
      // notify other parts (optional)
      try { localStorage.setItem('bookings_last_updated', Date.now().toString()) } catch (e) {}
      try { window.dispatchEvent(new CustomEvent('bookings:updated')) } catch (e) {}
    } catch (err) {
      alert(err?.message || 'Failed to create booking')
    } finally { setSubmitting(false) }
  }

  if(loading) return <div className="py-12 text-center text-gray-600">Loading listing...</div>
  if(!listing) return <div className="py-12 text-center text-red-600">Listing not found.</div>

  return (
    <>
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

            {listing.amenities && listing.amenities.length > 0 && (
              <div className="mt-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Facilities</h4>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.map((a, i) => (
                    <span key={i} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">{a}</span>
                  ))}
                </div>
              </div>
            )}

            {listing.reviews && listing.reviews.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Reviews</h3>
                <div className="space-y-3">
                  {listing.reviews.map(r => (
                    <div key={r.review_id} className="p-3 border rounded bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-sm">{r.user_name || 'User'}</div>
                        <div className="text-xs text-gray-500">{new Date(r.review_date).toLocaleString()}</div>
                      </div>
                      <div className="text-sm text-yellow-500">{'★'.repeat(r.rating || 0)}</div>
                      <div className="text-sm text-gray-700 mt-1">{r.comment}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
              onClick={openBooking}
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
  {/* Booking modal */}
    {showBooking && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-lg w-full">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">Book / Contact</h3>
            <button onClick={() => setShowBooking(false)} className="text-gray-500">Close</button>
          </div>

          <div className="mt-4">
            <div className="text-sm text-gray-600">Owner</div>
            <div className="font-medium">{listing.owner_name || 'Owner'}</div>
            <div className="text-sm text-gray-600">Contact</div>
            <div className="font-medium">{listing.owner_phone || 'Not provided'}</div>
          </div>

          <form onSubmit={handleCreateBooking} className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <div className="text-xs text-gray-600">Check-in</div>
                <input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} className="mt-1 block w-full p-2 border rounded" required />
              </label>
              <label className="block">
                <div className="text-xs text-gray-600">Check-out</div>
                <input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} className="mt-1 block w-full p-2 border rounded" required />
              </label>
            </div>

            <div className="flex items-center gap-3">
              <button type="submit" disabled={submitting} className="px-4 py-2 bg-indigo-600 text-white rounded">
                {submitting ? 'Booking...' : 'Create Booking'}
              </button>
              <button type="button" onClick={()=>{ setCheckIn(''); setCheckOut('') }} className="px-3 py-2 border rounded">Clear</button>
            </div>
          </form>

          {bookingResult && (
            <div className="mt-4 p-3 border rounded bg-green-50">
              <div className="text-sm text-gray-600">Booking created</div>
              <div className="font-medium">Status: {bookingResult.status}</div>
              <div className="text-sm">Check-in: {bookingResult.check_in_date}</div>
              <div className="text-sm">Check-out: {bookingResult.check_out_date}</div>
              <div className="text-sm">Owner contact: {bookingResult.owner_phone}</div>
            </div>
          )}
        </div>
      </div>
    )}
    </>
  )
}
