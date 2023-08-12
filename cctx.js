const ccxt = require('ccxt');

// Create an instance of the Binance exchange class
const binance = new ccxt.binance();

// 1. Get the list of coins tradable on Binance
async function getTradableCoins() {
    const markets = await binance.load_markets();
    const tradableCoins = Object.keys(markets);
    return tradableCoins;
}

// 2. Get the average price of each coin based on the 100 most recent trades
async function getAveragePrices() {
    const tradableCoins = await getTradableCoins();
//    return tradableCoins;
    const averagePrices = {};
    for (const coin of tradableCoins) {
        const trades = await binance.fetchTrades(coin, undefined, 1);
        const prices = trades.map(trade => parseFloat(trade.price));
        const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        averagePrices[coin] = averagePrice;

    }

    return averagePrices;
}

//Example usage
getTradableCoins().then(coins => {
    console.log('Tradable Coins on Binance:', coins);
});

getAveragePrices().then(prices => {
    console.log('Average Prices of Tradable Coins:');
    console.log(prices);
});
