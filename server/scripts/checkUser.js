import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import OTP from '../models/OTP.js';

dotenv.config();

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const email = process.argv[2] || 'nitishthanu@gmail.com';

        console.log(`Checking status for ${email}...`);

        const user = await User.findOne({ email });
        if (user) {
            console.log('--- USER RECORD ---');
            console.log('ID:', user._id);
            console.log('Verified:', user.isVerified);
            console.log('Name:', user.name);
            console.log('------------------');
        } else {
            console.log('No user record found.');
        }

        const otpRecord = await OTP.findOne({ email });
        if (otpRecord) {
            console.log('--- OTP RECORD ---');
            console.log('OTP:', otpRecord.otp);
            console.log('CreatedAt:', otpRecord.createdAt);
            console.log('Valid for:', otpRecord.name ? 'New Signup' : 'Existing User');
            console.log('-----------------');
        } else {
            console.log('No OTP record found.');
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

check();
