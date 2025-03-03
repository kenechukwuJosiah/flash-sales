import express from 'express';
import { getLeaderboard } from '../controllers/';
import { protect } from '../middleware';


const router = express.Router();

// Fetch leaderboard
router.get('/', protect, getLeaderboard);

export const leaderboardRoutes = router;