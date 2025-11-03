import express from 'express';
import { registerUser, loginUser, getCurrentUser, updateCurrentUser } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// returns current authenticated user
router.get('/me', verifyToken, getCurrentUser);
// update current authenticated user
router.put('/me', verifyToken, updateCurrentUser);

export default router;