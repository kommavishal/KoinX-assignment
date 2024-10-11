//calculating standard deviation
const calculateStandardDeviation = (prices) => {
    const n = prices.length;
    const mean = prices.reduce((a, b) => a + b) / n;
    const variance = prices.map(price => (price - mean) ** 2).reduce((a, b) => a + b) / n;
    return Math.sqrt(variance);
};

module.exports = { calculateStandardDeviation }; 
  

  