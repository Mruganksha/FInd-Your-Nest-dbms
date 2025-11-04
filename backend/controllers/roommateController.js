import db from '../config/db.js';

export const getAllRoommates = (req, res) => {
  const { gender, minBudget, maxBudget, location } = req.query;
  let sql = `
    SELECT r.*, u.name, u.email, u.phone
    FROM roommate_profile r
    JOIN user u ON r.user_id = u.user_id
    WHERE 1=1
  `;
  const params = [];

  if (gender && gender !== 'Any') {
    sql += ' AND r.gender = ?';
    params.push(gender);
  }
  if (minBudget) {
    sql += ' AND r.budget >= ?';
    params.push(minBudget);
  }
  if (maxBudget) {
    sql += ' AND r.budget <= ?';
    params.push(maxBudget);
  }
  if (location) {
    sql += ' AND r.preferred_location LIKE ?';
    params.push(`%${location}%`);
  }

  db.query(sql, params, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
};

export const getRoommateByUser = (req, res) => {
  const sql = 'SELECT * FROM roommate_profile WHERE user_id = ?';
  db.query(sql, [req.user.id], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data[0] || null);
  });
};

export const createOrUpdateRoommate = (req, res) => {
  const user_id = req.user.id;
  const { budget, gender, preferred_location, college_name, lifestyle_habits, roommate_pref } = req.body;

  const sql = `
    INSERT INTO roommate_profile
      (user_id, budget, gender, preferred_location, college_name, lifestyle_habits, roommate_pref)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      budget=VALUES(budget),
      gender=VALUES(gender),
      preferred_location=VALUES(preferred_location),
      college_name=VALUES(college_name),
      lifestyle_habits=VALUES(lifestyle_habits),
      roommate_pref=VALUES(roommate_pref)
  `;

  db.query(sql, [user_id, budget, gender, preferred_location, college_name, lifestyle_habits, roommate_pref], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Profile saved successfully' });
  });
};
