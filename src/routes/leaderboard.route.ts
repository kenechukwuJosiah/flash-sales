import express from 'express';
import { getLeaderboard } from '../controllers/';
import { protect } from '../middleware';


const router = express.Router();

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.get('/', protect, getLeaderboard);

export const leaderboardRoutes = router;