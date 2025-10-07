import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/api'

export default function ListingDetails(){
  const { id } = useParams()
  const [listing, setListing] = useState(null)

  useEffect(()=>{
    api.getListingById(id).then(setListing).catch(()=>alert('Failed to load'))
  }, [id])

  if(!listing) return <div>Loading...</div>

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow space-y-4">
      <h1 className="text-2xl font-semibold">{listing.name}</h1>
      <div className="text-sm text-gray-500">{listing.address} • {listing.city}</div>
      <div className="text-lg font-bold">₹{listing.rent} / month</div>
      <div>Amenities: {listing.amenities?.join(', ')}</div>
      <div>Gender preference: {listing.gender_preference}</div>
      <div>Available rooms: {listing.available_rooms}</div>
    </div>
  )
}
