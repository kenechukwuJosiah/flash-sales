import express from 'express';
import { getProduct, purchaseProduct } from '../controllers';
import { protect } from '../middleware';

const router = express.Router();

// @route   POST /api/sales/purchase
// @desc    Login user
// @access  Public
router.post('/purchase', protect, purchaseProduct);

// @route   POST /api/sales/stock/:productId
// @desc    Login user
// @access  Public
router.get('/stock/:productId', protect, getProduct);

export const salesRoutes = router;