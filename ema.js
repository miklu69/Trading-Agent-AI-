
function calculateEMA(prices, period) {
    const k = 2 / (period + 1);

    let ema = prices[0];

    for (let i = 1; i < prices.length; i++) {
        ema = prices[i] * k + ema * (1 - k);
    }

    return ema;
}

function getTradingSignal(prices) {

    const ema5 = calculateEMA(prices, 5);
    const ema13 = calculateEMA(prices, 13);

    let signal = "🟡 HOLD";
    let confidence = 50;

    if (ema5 > ema13) {
        signal = "🟢 BUY";
        confidence = 82;
    }

    if (ema5 < ema13) {
        signal = "🔴 SELL";
        confidence = 82;
    }

    const entry = prices[prices.length - 1];
    const stoploss = entry * 0.98;
    const target = entry * 1.05;

    return {
        ema5,
        ema13,
        signal,
        confidence,
        entry,
        stoploss,
        target
    };
}
