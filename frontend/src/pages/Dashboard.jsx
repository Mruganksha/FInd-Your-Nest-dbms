import React, { useEffect, useState } from 'react'
import api from '../api/api'

export default function Dashboard(){
  const [wishlist, setWishlist] = useState([])

  useEffect(()=>{
    api.getWishlist().then(setWishlist).catch(()=>setWishlist([]))
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Your Dashboard</h1>
      <section>
        <h2 className="text-lg font-medium mb-3">Wishlist</h2>
        {wishlist.length === 0 ? (
          <div className="text-sm text-gray-500">No items in wishlist. Add from Home.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wishlist.map(w => (
              <div key={w.listing_id} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold">{w.name}</h3>
                <div className="text-sm text-gray-500">₹{w.rent} • {w.city}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
