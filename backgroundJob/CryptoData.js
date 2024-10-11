const { schedule } = require('node-cron');
const fetch = require('node-fetch');
const Crypto = require('../model/Crypto_Schema');

// Function to fetch cryptocurrency data
const fetchCryptoData = async () => {
  try {
    const url = process.env.COINGECKO_URL || 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cmatic-network%2Cethereum';
    const response = await fetch(url);
    const data = await response.json();

    // Save data to the database
    data.forEach(async (crypto) => {
      const cryptoData = new Crypto({
        id: crypto.id,
        name: crypto.name,
        current_price: crypto.current_price,
        market_cap: crypto.market_cap,
        price_change_percentage_24h: crypto.price_change_percentage_24h
      });
      await cryptoData.save();
    });

    console.log('Crypto data updated successfully');
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
};

// fetching data for every 2 hours
const startScheduledJob = () => {
  schedule('0 */2 * * *', fetchCryptoData);
};

module.exports = { startScheduledJob };
