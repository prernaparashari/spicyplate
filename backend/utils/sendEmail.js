import nodemailer from 'nodemailer';

const sendOTPEmail = async (userEmail, otp) => {
    try {
        // 🔥 MAGIC FIX: Manual host/port hatakar built-in Gmail service use karein
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"Spicy Plate 🍕" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: 'Spicy Plate - Account Verification OTP',
            html: `<h2>Your OTP: ${otp}</h2>`
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully via Gmail Service!");
    } catch (error) {
        console.error("❌ Nodemailer Error:", error);
        throw new Error("Failed to send OTP email.");
    }
};

export default sendOTPEmail;