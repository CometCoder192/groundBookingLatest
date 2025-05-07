import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import cors from 'cors';

const router = express.Router();
const SECRET_KEY = 'your-secret-key-2025';

router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;
  
    try {
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: 'User already exists' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ 
        name, 
        email, 
        password: hashedPassword, 
        role: role || 'student'
      });
      await newUser.save();
  
      const token = jwt.sign({ id: newUser._id, role: newUser.role }, SECRET_KEY);
      res.status(201).json({ token, name: newUser.name, role: newUser.role });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY);
    res.json({ token, name: user.name, role: user.role });
});
  
router.get('/dev/clear-users', async (req, res) => {
    try {
      await User.deleteMany({});
      res.send('All users deleted');
    } catch (err) {
      res.status(500).send('Error clearing users');
    }
});

export default router;
