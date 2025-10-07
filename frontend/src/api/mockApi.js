// Simple in-memory mock API for development without backend.
let user = null;
let wishlist = [];
const listings = [
  { listing_id: 1, name: 'Cozy PG near COEP', city: 'Pune', rent: 6000, gender_preference: 'Co-ed', verified: true, available_rooms: 4, address: 'Near COEP, Pune', amenities: ['Wi-Fi','Meals','Laundry'], added_on: '2025-09-01' },
  { listing_id: 2, name: 'Budget Hostel for Girls', city: 'Pune', rent: 4500, gender_preference: 'Female', verified: false, available_rooms: 6, address: 'Kothrud, Pune', amenities: ['Wi-Fi','Meals'], added_on: '2025-08-10' },
  { listing_id: 3, name: 'Comfort Stay - Boys PG', city: 'Mumbai', rent: 8000, gender_preference: 'Male', verified: true, available_rooms: 2, address: 'Andheri, Mumbai', amenities: ['Wi-Fi','Attached Bathroom'], added_on: '2025-07-20' }
];

export default {
  login: async ({ email, password }) => {
    // any email/password works in mock; return token-like object
    user = { user_id: 1, name: 'Mock User', email, role: 'Student' };
    return Promise.resolve({ token: 'mock-token', user });
  },
  register: async (data) => {
    user = { user_id: 2, name: data.name || 'New User', email: data.email, role: data.role || 'Student' };
    return Promise.resolve({ message: 'Registered (mock)', user });
  },
  getListings: async (params) => {
    let res = listings.slice();
    if (params) {
      if (params.city) res = res.filter(l => l.city.toLowerCase().includes(params.city.toLowerCase()));
      if (params.minRent) res = res.filter(l => l.rent >= Number(params.minRent));
      if (params.maxRent) res = res.filter(l => l.rent <= Number(params.maxRent));
    }
    return Promise.resolve(res);
  },
  getListingById: async (id) => {
    const l = listings.find(x => String(x.listing_id) === String(id));
    return Promise.resolve(l || null);
  },
  addWishlist: async (listingId) => {
    if (!user) return Promise.reject({ message: 'Not logged in (mock)' });
    if (!wishlist.includes(listingId)) wishlist.push(listingId);
    return Promise.resolve({ message: 'Added to wishlist (mock)', wishlist });
  },
  getWishlist: async () => {
    if (!user) return Promise.reject({ message: 'Not logged in (mock)' });
    const items = listings.filter(l => wishlist.includes(l.listing_id));
    return Promise.resolve(items);
  }
}
