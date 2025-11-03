import  db  from "../config/db.js";

export const createBooking = (req, res) => {
  const { listing_id, check_in_date, check_out_date } = req.body;
  const user_id = req.user.id;
  const sql =
    "INSERT INTO BOOKING (user_id, listing_id, check_in_date, check_out_date, status, timestamp) VALUES (?, ?, ?, ?, 'Pending', NOW())";
  db.query(sql, [user_id, listing_id, check_in_date, check_out_date], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    const bookingId = result.insertId;
    // return the created booking with listing and owner contact
    const q = `SELECT B.*, L.name as listing_name, L.city, L.rent, U.name as owner_name, U.phone as owner_phone FROM booking B JOIN listing L ON B.listing_id=L.listing_id JOIN user U ON L.owner_id=U.user_id WHERE B.booking_id = ?`;
    db.query(q, [bookingId], (err2, rows) => {
      if (err2) return res.status(500).json({ error: err2 });
      res.status(201).json({ booking: rows[0] });
    });
  });
};

export const getUserBookings = (req, res) => {
  const user_id = req.user.id;
  const sql =
    "SELECT B.*, L.name, L.city, L.rent FROM BOOKING B JOIN LISTING L ON B.listing_id=L.listing_id WHERE B.user_id=?";
  db.query(sql, [user_id], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
};
