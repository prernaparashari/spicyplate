const sendOTPEmail = async (userEmail, otp) => {
    try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                sender: { 
                    name: "Spicy Plate", 
                    email: process.env.EMAIL_USER 
                },
                to: [{ email: userEmail }],
                subject: "Spicy Plate - Account Verification OTP",
                htmlContent: `
                    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 10px;">
                        <h2 style="color: #ff4757; text-align: center;">Spicy Plate 🍕</h2>
                        <p style="font-size: 16px; color: #2f3542;">Hello,</p>
                        <p style="font-size: 16px; color: #2f3542;">Your One-Time Password (OTP) for account verification is:</p>
                        <div style="background-color: #f1f2f6; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #ff4757; border-radius: 8px; margin: 20px 0;">
                            ${otp}
                        </div>
                        <p style="font-size: 14px; color: #747d8c; text-align: center;">This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
                    </div>
                `
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to send email via Brevo');
        }

        console.log(" Real OTP Email sent successfully via Brevo API!");
    } catch (error) {
        console.error(" Brevo API Error:", error.message);
        throw new Error("Failed to send OTP email.");
    }
};

export default sendOTPEmail;