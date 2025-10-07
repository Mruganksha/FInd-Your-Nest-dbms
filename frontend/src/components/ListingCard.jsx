import React from 'react'
import { Link } from 'react-router-dom'

export default function ListingCard({listing, onWishlist}){
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{listing.name}</h3>
          <p className="text-sm text-gray-500">{listing.address} • {listing.city}</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold">₹{listing.rent}</div>
          <div className="text-sm text-gray-500">/month</div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm">
          <div>{listing.gender_preference} • {listing.available_rooms} rooms</div>
          <div className="text-xs text-gray-500">Amenities: {listing.amenities?.join(', ')}</div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <button onClick={() => onWishlist(listing.listing_id)} className="px-3 py-1 border rounded text-sm">Wishlist</button>
          <Link to={`/listing/${listing.listing_id}`} className="text-sm text-blue-600">View details</Link>
        </div>
      </div>
    </div>
  )
}
