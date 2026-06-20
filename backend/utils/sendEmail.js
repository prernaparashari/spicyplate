import nodemailer from 'nodemailer';

const sendOTPEmail = async (userEmail, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',  // 👈 strict host 
            port: 465,               // 👈 Secure SMTP port
            secure: true,            // 👈 Port 465  true
            family: 4,               // 👈 STICKY IPV4 FORCE
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
        console.log("✅ Email sent successfully");
    } catch (error) {
        console.error("❌ Nodemailer Error:", error);
        throw new Error("Failed to send OTP email.");
    }
};

export default sendOTPEmail;