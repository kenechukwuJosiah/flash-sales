import express from 'express';
import cors from 'cors';
import { connectDB } from './config';
// import flashSaleRoutes from './routes/flashSale';
// import leaderboardRoutes from './routes/leaderboard';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// // Routes
// app.use('/api/flash-sale', flashSaleRoutes);
// app.use('/api/leaderboard', leaderboardRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({ message: err.message });
});

export default app;