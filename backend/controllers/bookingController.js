import db from "../config/db.js";

// ✅ Create a new booking
export const createBooking = (req, res) => {
  const { listing_id, check_in_date, check_out_date } = req.body;
  const user_id = req.user?.id;

  if (!listing_id || !check_in_date || !check_out_date) {
    return res.status(400).json({
      error: "Listing ID, check-in date, and check-out date are required.",
    });
  }

  const sql = `
    INSERT INTO booking 
    (user_id, listing_id, check_in_date, check_out_date, status, timestamp)
    VALUES (?, ?, ?, ?, 'Pending', NOW())
  `;

  db.query(sql, [user_id, listing_id, check_in_date, check_out_date], (err) => {
    if (err) {
      console.error("❌ Booking insert error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "✅ Booking created successfully." });
  });
};

// ✅ Get all bookings for the logged-in user
export const getUserBookings = (req, res) => {
  const user_id = req.user?.id;

  const sql = `
    SELECT 
      b.booking_id,
      b.listing_id,
      b.check_in_date,
      b.check_out_date,
      b.status,
      b.timestamp,
      l.name AS listing_name,
      l.city,
      l.rent
    FROM booking b
    JOIN listing l ON b.listing_id = l.listing_id
    WHERE b.user_id = ?
    ORDER BY b.timestamp DESC
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error("❌ Booking fetch error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};
