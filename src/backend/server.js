import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import User from './models/User.js';

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = 'your-secret-key-2025';

mongoose.connect('mongodb+srv://topictreasures:ObbER2Ak6radux2Z@cluster0.wvrcsbv.mongodb.net/groundBooking?retryWrites=true&w=majority&appName=Cluster0')

// Signup route
app.post('/api/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    // Create user with role
    const user = await User.create({ name, email, password, role });

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY);
    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Signup failed' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY);
    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
