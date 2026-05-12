import express from 'express';
const router = express.Router();
import { authUser, registerUser, verifyOTP } from '../controllers/authController.js';
import sendEmail from '../utils/sendEmail.js';

router.post('/', registerUser);
router.post('/login', authUser);
router.post('/verify-otp', verifyOTP);

// Diagnostic test: /api/auth/test-email?email=your@email.com
router.get('/test-email', async (req, res) => {
    const testEmail = req.query.email || 'nitishthanu@gmail.com';
    console.log(`[DIAG] Test email requested for: ${testEmail}`);
    try {
        await sendEmail(testEmail, 'GeoIntel Diagnostic', 'If you see this, your SMTP is definitely working!');
        res.json({ message: `Test email sent to ${testEmail}` });
    } catch (error) {
        console.error(`[DIAG] Test email FAILED for ${testEmail}:`, error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
