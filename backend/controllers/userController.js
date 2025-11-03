import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

// ✅ REGISTER USER
export const registerUser = (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  // Check if user already exists
  const checkSql = "SELECT * FROM USER WHERE email = ?";
  db.query(checkSql, [email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length > 0)
      return res.status(400).json({ message: "Email already registered" });

    // Hash password and insert new user
    const hashed = bcrypt.hashSync(password, 10);
    const insertSql =
      "INSERT INTO USER (name, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())";

    db.query(insertSql, [name, email, hashed, role || "user"], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

// ✅ LOGIN USER
export const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const sql = "SELECT * FROM USER WHERE email = ?";
  db.query(sql, [email], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    if (data.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = data[0];
    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    
    // Generate JWT token
const token = jwt.sign(
  { user_id: user.id, role: user.role }, // ✅ use correct column name
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);




    // Remove password before sending user details
    delete user.password;
    res.json({ token, user });
  });
};

// ✅ GET ALL USERS
export const getAllUsers = (req, res) => {
  const sql = "SELECT user_id, name, email, role, created_at FROM USER";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
};
