import nodemailer from 'nodemailer';
import dns from 'dns';

const sendOTPEmail = async (userEmail, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',  
            port: 587,               
            secure: false,           
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            lookup: (hostname, opts, callback) => {
                dns.lookup(hostname, { ...opts, family: 4 }, callback);
            }
        });

        const mailOptions = {
            from: `"Spicy Plate 🍕" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: 'Spicy Plate - Account Verification OTP',
            html: `<h2>Your OTP: ${otp}</h2>`
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully");
    } catch (error) {
        console.error("❌ Nodemailer Error:", error);
        throw new Error("Failed to send OTP email.");
    }
};

export default sendOTPEmail;