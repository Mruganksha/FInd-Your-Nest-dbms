import React, { useEffect, useState } from 'react'
import api from '../api/api'
import ListingCard from '../components/ListingCard'
import FilterBar from '../components/FilterBar'

export default function Home(){
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchListings = async (params) => {
    setLoading(true)
    try {
      const data = await api.getListings(params)
      setListings(data)
    } catch (err) {
      console.error(err)
      alert('Failed to load listings')
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
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Find PGs & Hostels</h1>
      <FilterBar onFilter={handleFilter} />
      {loading ? <div>Loading...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map(l => <ListingCard key={l.listing_id} listing={l} onWishlist={handleWishlist} />)}
        </div>
      )}
    </div>
  )
}
