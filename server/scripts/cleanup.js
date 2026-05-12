import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const cleanup = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const email = 'nitish250801k@gmail.com';

        console.log(`Cleaning up unverified user: ${email}...`);

        const result = await User.deleteMany({ email, isVerified: false });
        console.log(`Deleted ${result.deletedCount} unverified records.`);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

cleanup();
