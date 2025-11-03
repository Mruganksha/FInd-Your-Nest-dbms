import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import  db  from "../config/db.js";

export const registerUser = (req, res) => {
  const { name, email, password, role, phone, gender, college_name, age } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Name, email and password required" });

  const hashed = bcrypt.hashSync(password, 10);
  const sql =
    "INSERT INTO USER (name, email, password, phone, role, gender, college_name, age, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())";

  db.query(sql, [name, email, hashed, phone || null, role || 'Student', gender || null, college_name || null, age || null], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    const insertId = result.insertId;
    // return created user (without password)
    db.query('SELECT user_id, name, email, phone, role, gender, college_name, age, created_at FROM USER WHERE user_id = ?', [insertId], (err2, rows) => {
      if (err2) return res.status(500).json({ error: err2 });
      res.status(201).json({ user: rows[0] });
    });
  });
};

export const getCurrentUser = (req, res) => {
  const userId = req.user.id;
  db.query('SELECT user_id, name, email, phone, role, gender, college_name, age, created_at FROM USER WHERE user_id = ?', [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(rows[0]);
  });
};

export const updateCurrentUser = (req, res) => {
  const userId = req.user.id;
  const { name, phone, gender, college_name, age } = req.body;
  const sql = 'UPDATE USER SET name = ?, phone = ?, gender = ?, college_name = ?, age = ? WHERE user_id = ?';
  db.query(sql, [name, phone || null, gender || null, college_name || null, age || null, userId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    db.query('SELECT user_id, name, email, phone, role, gender, college_name, age, created_at FROM USER WHERE user_id = ?', [userId], (err2, rows) => {
      if (err2) return res.status(500).json({ error: err2 });
      res.json(rows[0]);
    });
  });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM USER WHERE email = ?";
  db.query(sql, [email], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    if (data.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = data[0];
    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const safeUser = {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      gender: user.gender,
      college_name: user.college_name,
      age: user.age,
      created_at: user.created_at,
    }
    res.json({ token, user: safeUser });
  });
};
