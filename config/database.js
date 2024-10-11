require('dotenv').config();

const mongoose = require('mongoose');

const dbURI = process.env.MONGO_URI; 

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
