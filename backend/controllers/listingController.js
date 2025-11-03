import db from "../config/db.js";

// ✅ Get all listings
export const getAllListings = (req, res) => {
  const sql = "SELECT * FROM listing";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching listings:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.status(200).json(data);
  });
};

// ✅ Get listing by ID
export const getListingById = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT L.*, GROUP_CONCAT(F.facility_name) AS facilities
    FROM listing L
    LEFT JOIN listing_facility LF ON L.listing_id = LF.listing_id
    LEFT JOIN facility F ON LF.facility_id = F.facility_id
    WHERE L.listing_id = ?
    GROUP BY L.listing_id
  `;

  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Error fetching listing:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json(data[0]);
  });
};


// ✅ Add a new listing
export const addListing = (req, res) => {
  const {
    name,
    description,
    address,
    city,
    rent,
    gender_preference,
    available_rooms,
  } = req.body;

  const sql = `
    INSERT INTO LISTING 
    (name, description, address, city, rent, gender_preference, available_rooms, verified)
    VALUES (?, ?, ?, ?, ?, ?, ?, 0)
  `;

  db.query(
    sql,
    [name, description, address, city, rent, gender_preference, available_rooms],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Listing added successfully", id: result.insertId });
    }
  );
};

// ✅ Delete a listing by ID
export const deleteListing = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM LISTING WHERE listing_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Listing not found" });

    res.json({ message: "Listing deleted successfully" });
  });
};

// ✅ Update a listing by ID
export const updateListing = (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    address,
    city,
    rent,
    gender_preference,
    available_rooms,
  } = req.body;

  const sql = `
    UPDATE LISTING 
    SET name = ?, description = ?, address = ?, city = ?, rent = ?, gender_preference = ?, available_rooms = ?
    WHERE listing_id = ?
  `;

  db.query(
    sql,
    [name, description, address, city, rent, gender_preference, available_rooms, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Listing not found" });

      res.json({ message: "Listing updated successfully" });
    }
  );
};