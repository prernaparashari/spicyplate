import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import sendOTPEmail from '../utils/sendEmail.js';

const router = express.Router();


// 🔥 SIGNUP ROUTE (OTP + Email Send)
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check existing user
    const userExists = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email or Phone already registered."
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Create user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      otp: generatedOtp
    });

    await newUser.save();

    // 🔥 SEND EMAIL
    await sendOTPEmail(email, generatedOtp);

    res.status(201).json({
      success: true,
      message: "OTP sent to your email."
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error."
    });
  }
});


// 🔥 VERIFY OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });

    if (!user || user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP."
      });
    }

    // Mark verified
    user.isVerified = true;
    user.otp = null;
    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      token
    });

  } catch (error) {
    console.error("OTP Verify Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error."
    });
  }
});


// 🔥 LOGIN ROUTE
router.post('/login', async (req, res) => {
  try {
    const { userIdentity, password } = req.body;

    const user = await User.findOne({
      $or: [
        { email: userIdentity },
        { phone: userIdentity }
      ]
    });

    if (!user || !user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User not found or not verified."
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials."
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      token
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error."
    });
  }
});

export default router;