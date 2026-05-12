import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import OTP from '../models/OTP.js';

dotenv.config();

const check = async () => {
    try {
        console.log('Connecting to:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        const users = await User.find({});
        console.log(`--- USERS FOUND: ${users.length} ---`);
        users.forEach(u => {
            console.log(`- ${u.email} (Verified: ${u.isVerified})`);
        });

        const otps = await OTP.find({});
        console.log(`--- OTPs FOUND: ${otps.length} ---`);
        otps.forEach(o => {
            console.log(`- ${o.email} (Code: ${o.otp})`);
        });

        process.exit();
    } catch (err) {
        console.error('ERROR:', err.message);
        process.exit(1);
    }
};

check();
