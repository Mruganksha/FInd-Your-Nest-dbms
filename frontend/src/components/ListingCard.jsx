import React from 'react'
import { Link } from 'react-router-dom'

export default function ListingCard({ listing, onWishlist }) {
  const id = listing.listing_id || listing.id || listing._id
  const rent = listing.rent ?? listing.price ?? '--'
  const amenities = Array.isArray(listing.amenities) ? listing.amenities.slice(0, 4) : []

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col">
      <div className="relative h-44 bg-gray-100">
        {listing.image || (listing.images && listing.images[0]) ? (
          <img
            src={listing.image ?? listing.images[0]}
            alt={listing.name ?? 'Listing image'}
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

        <button
          onClick={() => onWishlist && onWishlist(id)}
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 bg-white/95 rounded-full p-2 shadow hover:scale-105 transform transition"
        >
          <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21s-7-4.35-9.33-6.42C.9 12.93 1.7 7.72 6.2 5.6 8.06 4.6 10.37 5 12 6.6 13.63 5 15.94 4.6 17.8 5.6c4.5 2.12 5.3 7.33 3.53 9.98C19 16.65 12 21 12 21z" />
          </svg>
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-md font-semibold text-gray-800 truncate">{listing.name ?? 'Listing'}</h3>
            <p className="text-xs text-gray-500 mt-1 truncate">{listing.address ?? listing.location ?? ''}</p>
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
          <Link
            to={`/listing/${id}`}
            className="text-sm text-indigo-600 hover:underline"
          >
            View details
          </Link>

          <button
            onClick={() => onWishlist && onWishlist(id)}
            className="px-3 py-1 text-sm bg-gray-100 rounded border hover:bg-gray-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
