const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;
    // fallback to local if env var is missing or contains a placeholder
    if (!uri || !uri.startsWith('mongodb')) {
      uri = 'mongodb://127.0.0.1:27017/taskdb';
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
