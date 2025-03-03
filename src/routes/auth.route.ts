import { Router } from 'express';
import { Request, Response } from 'express';
import { User } from '../models/Users';

import { protect } from '../middleware/auth.middleware';
import { login, registerUser } from '../controllers';

const router = Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser );

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', login);

// @route   GET /api/auth/me
// @desc    Get user profile
// @access  Private
router.get('/me', protect, async (req: Request, res: Response) => {
  res.json(req.user);
});

export const authRoutes = router;
