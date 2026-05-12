import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import fetchNews from '../services/newsService.js';

dotenv.config();

const runNewsFetch = async () => {
    try {
        await connectDB();
        console.log('Force triggering global news fetch...');
        await fetchNews();
        console.log('News fetch complete.');
        process.exit();
    } catch (error) {
        console.error('Fatal fetch error:', error);
        process.exit(1);
    }
};

runNewsFetch();
