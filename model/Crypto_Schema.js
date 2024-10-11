//schema for crypto data 
const { Schema, model } = require('mongoose');

const cryptoSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  current_price: { type: Number, required: true },
  market_cap: { type: Number, required: true },
  price_change_percentage_24h: { type: Number, required: true },
  last_updated: { type: Date, default: Date.now }
});

const Crypto = model('Crypto', cryptoSchema);

module.exports = Crypto;
