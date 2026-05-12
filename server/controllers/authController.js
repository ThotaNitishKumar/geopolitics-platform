import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import OTP from '../models/OTP.js';
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(`[AUTH] --- Incoming Login Attempt ---`);
    console.log(`[AUTH] Email: ${email}`);

    const user = await User.findOne({ email });

    if (user) {
        console.log(`[AUTH] User record found in DB.`);
        console.log(`[AUTH] isVerified status: ${user.isVerified} (Type: ${typeof user.isVerified})`);

        if (await user.matchPassword(password)) {
            console.log(`[AUTH] Password match: SUCCESS`);

            if (user.isVerified === true) {
                console.log(`[AUTH] Verification check: PASSED`);
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id),
                });
            } else {
                console.log(`[AUTH] Verification check: FAILED (isVerified is not true)`);
                res.status(401);
                throw new Error('Verification required. Please check your email for the OTP.');
            }
        } else {
            console.log(`[AUTH] Password match: FAILED`);
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } else {
        console.log(`[AUTH] User record: NOT FOUND`);
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user & Send OTP
// @route   POST /api/auth
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    console.log(`[TRACE] Register hit for: ${email}`);

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log(`[TRACE] Existing user record found. isVerified: ${userExists.isVerified}`);
            if (userExists.isVerified === true) {
                res.status(400);
                throw new Error('Email already registered and verified.');
            } else {
                console.log(`[TRACE] Found unverified record for ${email}. Deleting to prevent conflict.`);
                await User.deleteMany({ email });
            }
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`[TRACE] Generated OTP: ${otp}`);

        // Save temporary details in OTP collection
        console.log(`[TRACE] Saving temporary OTP record...`);
        await OTP.findOneAndUpdate(
            { email },
            { name, password, otp, createdAt: Date.now() },
            { upsert: true, new: true }
        );
        console.log(`[TRACE] OTP record saved.`);

        // Send Email
        console.log(`[TRACE] Calling sendEmail for ${email}...`);
        await sendEmail(
            email,
            "Your Access Code - Geopolitics Platform",
            `Your activation code is: ${otp}. It will expire in 10 minutes.`
        );
        console.log(`[TRACE] sendEmail reported SUCCESS for ${email}`);

        res.status(200).json({
            message: 'Verification code sent to email',
            email
        });
    } catch (error) {
        console.error(`[TRACE] FATAL ERROR for ${email}:`, error);
        res.status(error.statusCode || 500);
        throw new Error(error.message || "Internal registration error");
    }
});

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    console.log(`Verification attempt for: ${email} with OTP: ${otp}`);

    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
        console.log(`Invalid OTP for ${email}`);
        res.status(400);
        throw new Error('Invalid or expired OTP');
    }

    console.log(`OTP verified for ${email}. Creating/Updating user...`);

    // Now create or update the user and mark as verified
    let user = await User.findOne({ email });

    if (user) {
        user.name = otpRecord.name;
        user.password = otpRecord.password;
        user.isVerified = true;
        await user.save();
    } else {
        user = await User.create({
            name: otpRecord.name,
            email: otpRecord.email,
            password: otpRecord.password,
            isVerified: true
        });
    }

    console.log(`User ${email} created/updated successfully.`);

    // Delete OTP record after successful verification
    await OTP.deleteOne({ _id: otpRecord._id });

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
    });
});

export { authUser, registerUser, verifyOTP };
