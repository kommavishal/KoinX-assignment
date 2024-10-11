const { Router } = require('express');
const Crypto = require('../model/Crypto_Schema'); // Import the Crypto model
const { calculateStandardDeviation } = require('../statistics/stats');

const router = Router();

//stats: Return the latest data about the requested cryptocurrency
router.get('/stats', async (req, res) => {
    const { coin } = req.query;
    try {
        const crypto = await Crypto.findOne({ id: coin }).sort({ last_updated: -1 }); // Use the model to find
        if (!crypto) return res.status(404).json({ error: 'Cryptocurrency not found' });

        const response = {
            price: crypto.current_price,
            marketCap: crypto.market_cap,
            '24hChange': crypto.price_change_percentage_24h
        };

        // Display the response on the console
        console.log('------- Stats ------');
        console.log(`Price: $${response.price}`);
        console.log(`Market Cap: $${response.marketCap}`);
        console.log(`24h Change: ${response['24hChange']}%`);
        console.log('--------------------');

        // Send the response to the client
        res.json(response);
        
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//deviation: Return the standard deviation of the price for the last 100 records
router.get('/deviation', async (req, res) => {
    const { coin } = req.query;
    try {
        const prices = await Crypto.find({ id: coin }) // Use the model to find
            .sort({ last_updated: -1 })
            .limit(100)
            .select('current_price');

        const priceArray = prices.map(p => p.current_price);
        const deviation = calculateStandardDeviation(priceArray);

        // Display the deviation on the console
        console.log('------- Deviation --------');
        console.log(`Deviation for ${coin}: ${deviation}`);
        console.log('--------------------------');

        res.json({ deviation });
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
