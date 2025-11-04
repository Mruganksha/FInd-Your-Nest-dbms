import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api'

export default function ListingCard({ listing, onWishlist }) {
  const id = listing.listing_id || listing.id || listing._id
  const rent = listing.rent ?? listing.price ?? '--'
  const amenities = Array.isArray(listing.amenities) ? listing.amenities.slice(0, 4) : []

  const [showReport, setShowReport] = useState(false)
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmitReport = async () => {
    if (!localStorage.getItem('token')) {
      alert('Please login to report a listing')
      return
    }
    if (!reason.trim()) {
      alert('Please enter a reason')
      return
    }

    setSubmitting(true)
    try {
      await api.addReport({ listing_id: id, reason })
      alert('Report submitted')
      setReason('')
      setShowReport(false)
    } catch (err) {
      alert(err?.message || 'Failed to submit report')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col">
        <div className="relative h-44 bg-gray-100">
          {listing.image || (listing.images && listing.images[0]) ? (
            <img
              src={listing.image_file ? `/images/${listing.image_file}` : '/images/default.jpg'}
              alt={listing.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}

          <div className="absolute top-3 left-3 bg-white/90 text-xs text-gray-700 px-2 py-0.5 rounded shadow">
            {listing.city ?? '—'}
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-md font-semibold text-gray-800 truncate">{listing.name ?? 'Listing'}</h3>
              <p className="text-xs text-gray-500 mt-1 truncate">{listing.address ?? listing.location ?? ''}</p>
            </div>

            <div className="text-right">
              {listing.avg_rating ? (
                <div className="text-sm text-yellow-500">
                  {'★'.repeat(Math.round(listing.avg_rating))} <span className="text-xs text-gray-500">({listing.review_count ?? 0})</span>
                </div>
              ) : (
                <div className="text-xs text-gray-400">No reviews</div>
              )}
            </div>

            <div className="text-right">
              <div className="text-lg font-bold text-indigo-600">₹{typeof rent === 'number' ? rent.toLocaleString() : rent}</div>
              <div className="text-xs text-gray-500">/ month</div>
            </div>
          </div>

          <div className="mt-3 flex-1">
            <div className="text-sm text-gray-600">
              <span className="mr-2">{listing.gender_preference ?? 'Any'}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="ml-2">{listing.available_rooms ?? 'N/A'} rooms</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {amenities.length > 0 ? amenities.map((a, i) => (
                <span key={i} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">{a}</span>
              )) : (
                <span className="text-xs text-gray-400">No amenities listed</span>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Link to={`/listing/${id}`} className="text-sm text-indigo-600 hover:underline">
              View details
            </Link>

            <div className="flex gap-2">
              <button
                onClick={() => setShowReport(true)}
                className="px-3 py-1 text-sm bg-red-100 rounded border hover:bg-red-200"
              >
                Report
              </button>

              <button
                onClick={() => onWishlist && onWishlist(id)}
                className="px-3 py-1 text-sm bg-gray-100 rounded border hover:bg-gray-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Popup */}
      {showReport && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Report Listing</h3>
            <p className="text-sm text-gray-600 mb-3">Why are you reporting this listing?</p>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border rounded h-28"
              placeholder="Enter your reason..."
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowReport(false)}
                className="px-3 py-2 text-sm border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmitReport}
                disabled={submitting}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                {submitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
