import express from 'express';
import { getProduct, purchaseProduct } from '../controllers';
import { protect } from '../middleware';

const router = express.Router();

router.post('/purchase', protect, purchaseProduct);

router.get('/stock/:productId', protect, getProduct);

export const salesRoutes = router;