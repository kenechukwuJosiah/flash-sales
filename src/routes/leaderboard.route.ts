import express from 'express';
import { getLeaderboard } from '../controllers/';


const router = express.Router();

// Fetch leaderboard
router.get('/', getLeaderboard);

export default router;