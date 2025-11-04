import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  getAllRoommates,
  getRoommateByUser,
  createOrUpdateRoommate,
} from '../controllers/roommateController.js';

const router = express.Router();

router.get('/', getAllRoommates);

router.get('/me', verifyToken, getRoommateByUser);

router.post('/', verifyToken, createOrUpdateRoommate);

export default router;
