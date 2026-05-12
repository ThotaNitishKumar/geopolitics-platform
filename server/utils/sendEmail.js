import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (email, subject, text) => {
    console.log(`[SMTP] Attempting delivery to: ${email}`);
    console.log(`[SMTP] Auth User: ${process.env.EMAIL_USER ? process.env.EMAIL_USER.substring(0, 3) + '...' : 'MISSING'}`);

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        console.log(`[SMTP] Sending now...`);
        const info = await transporter.sendMail({
            from: `"GeoIntel Intelligence" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            text: text,
        });

        console.log(`[SMTP] SUCCESS! Message ID: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error("[SMTP] CRITICAL FAILURE:", error.message);
        throw new Error(error.message);
    }
};

export default sendEmail;
