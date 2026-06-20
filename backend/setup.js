const fs = require('fs');
const path = require('path');

const folders = ['models', 'routes'];
folders.forEach(dir => { if (!fs.existsSync(dir)) fs.mkdirSync(dir); });

const files = {
  'models/User.js': `const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  otp: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);`,

  'routes/auth.js': `const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    let userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) return res.status(400).json({ success: false, message: "Email or Phone already registered." });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User({ name, email, phone, password: hashedPassword, otp: generatedOtp });
    await newUser.save();
    res.status(201).json({ success: true, message: "OTP generated: " + generatedOtp });
  } catch (error) { res.status(500).json({ success: false, message: "Server error." }); }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const user = await User.findOne({ phone });
    if (!user || user.otp !== otp) return res.status(400).json({ success: false, message: "Invalid OTP." });
    
    user.isVerified = true;
    user.otp = null;
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ success: true, token });
  } catch (error) { res.status(500).json({ success: false, message: "Server error." }); }
});

router.post('/login', async (req, res) => {
  try {
    const { userIdentity, password } = req.body;
    const user = await User.findOne({ $or: [{ email: userIdentity }, { phone: userIdentity }] });
    if (!user || !user.isVerified) return res.status(400).json({ success: false, message: "Login failed." });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials." });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ success: true, token });
  } catch (error) { res.status(500).json({ success: false, message: "Server error." }); }
});
module.exports = router;`
};

Object.keys(files).forEach(file => { fs.writeFileSync(file, files[file].trim()); });
console.log("⭐ [SUCCESS] Spicy Plate files updated securely.");