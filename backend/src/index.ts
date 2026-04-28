import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import collegeRoutes from './routes/collegeRoutes';
import authRoutes from './routes/authRoutes';
import predictorRoutes from './routes/predictorRoutes';
import userRoutes from './routes/userRoutes';
import { errorMiddleware } from './middleware/errorMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/colleges', collegeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/predictor', predictorRoutes);
app.use('/api/user', userRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

// Error handling
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
