const express = require('express');
const mongoose = require('./config/database'); // MongoDB connection
const cryptoRoutes = require('./routes/Routes');
const { startScheduledJob } = require('./backgroundJob/CryptoData');

const app = express();
app.use(express.json());

// Use the routes
app.use('/', cryptoRoutes);

// Start the scheduled job
startScheduledJob();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
