import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import startCronJobs from './cron/newsScheduler.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
import conflictRoutes from './routes/conflictRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
app.use('/api/conflicts', conflictRoutes);
app.use('/api/stats', statsRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use(notFound);
app.use(errorHandler);

// Start Scheduler
startCronJobs();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
