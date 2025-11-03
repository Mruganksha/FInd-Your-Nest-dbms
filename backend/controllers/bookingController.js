import  db  from "../config/db.js";

export const createBooking = (req, res) => {
  const { listing_id, check_in_date, check_out_date } = req.body;
  const user_id = req.user.id;
  const sql =
    "INSERT INTO BOOKING (user_id, listing_id, check_in_date, check_out_date, status, timestamp) VALUES (?, ?, ?, ?, 'Pending', NOW())";
  db.query(sql, [user_id, listing_id, check_in_date, check_out_date], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Booking created" });
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
