import mongoose from 'mongoose';
import User from './models/User.js';

await mongoose.connect('mongodb+srv://topictreasures:ObbER2Ak6radux2Z@cluster0.wvrcsbv.mongodb.net/groundBooking?retryWrites=true&w=majority&appName=Cluster0'); // replace with actual DB

await User.deleteMany({});
console.log('All users deleted');

await mongoose.disconnect();
