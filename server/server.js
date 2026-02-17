import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import conflictRoutes from './routes/conflictRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import startCronJobs from './cron/newsScheduler.js';

dotenv.config();

// Wrap everything inside async function
const startServer = async () => {
    try {
        // 1️⃣ Connect to MongoDB FIRST
        await connectDB();
        console.log('MongoDB Connected');

        // 2️⃣ Create Express App
        const app = express();

        // 3️⃣ Middlewares
        app.use(express.json());
        app.use(cors());
        app.use(helmet());
        app.use(morgan('dev'));

        // 4️⃣ Routes
        app.use('/api/auth', authRoutes);
        app.use('/api/news', newsRoutes);
        app.use('/api/conflicts', conflictRoutes);
        app.use('/api/stats', statsRoutes);

        app.get('/', (req, res) => {
            res.send('API is running...');
        });

        // 5️⃣ Error Handling
        app.use(notFound);
        app.use(errorHandler);

        const PORT = process.env.PORT || 5000;

        // 6️⃣ Start Server
        app.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });

        // 7️⃣ Start Cron Jobs AFTER DB connection
        startCronJobs();

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Start everything
startServer();
