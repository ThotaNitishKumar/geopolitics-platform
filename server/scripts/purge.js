import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const cleanup = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Purging all unverified users...');
        const result = await User.deleteMany({ isVerified: { $ne: true } });
        console.log(`Deleted ${result.deletedCount} unverified records.`);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

cleanup();
