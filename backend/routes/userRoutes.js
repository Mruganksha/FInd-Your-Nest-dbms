import express from "express";
import { registerUser, loginUser, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

// Register new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// (Optional) Get all users — useful for admin/testing
router.get("/", getAllUsers);

export default router;
