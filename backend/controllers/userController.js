import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

export const registerUser = (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  const hashed = bcrypt.hashSync(password, 10);
  const sql =
    "INSERT INTO USER (name, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())";

  db.query(sql, [name, email, hashed, role], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "User registered successfully" });
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
    res.json({ token, user });
  });
};
