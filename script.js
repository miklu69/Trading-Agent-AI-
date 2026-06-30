 async function startTrading() {
    const symbol = document.getElementById("symbol").value.toUpperCase().trim();
    const result = document.getElementById("result");

    if (!symbol) {
        result.innerHTML = "⚠️ Enter BTC, ETH or SOL";
        return;
    }

    const coins = {
        BTC: "bitcoin",
        ETH: "ethereum",
        SOL: "solana"
    };

    if (!coins[symbol]) {
        result.innerHTML = "❌ Supported: BTC, ETH, SOL";
        return;
    }

    result.innerHTML = "⏳ Loading live price...";

    try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coins[symbol]}&vs_currencies=inr&include_24hr_change=true`;

        const response = await fetch(url);
        const data = await response.json();

        const coin = data[coins[symbol]];
        const price = coin.inr;
        const change = coin.inr_24h_change;

        let signal = "🟡 HOLD";
        let entry = price;
        let stoploss = price * 0.98;
        let target = price * 1.05;

        if (change > 2) {
            signal = "🟢 BUY";
            target = price * 1.08;
        } else if (change < -2) {
            signal = "🔴 SELL";
            stoploss = price * 0.97;
        }

        result.innerHTML = `
            <hr>
            <h2>${symbol}</h2>

            <b>💰 Live Price:</b> ₹${price.toLocaleString()}<br>
            <b>📈 24h Change:</b> ${change.toFixed(2)}%<br>
            <b>🤖 AI Signal:</b> ${signal}<br><br>

            <b>🎯 Entry:</b> ₹${Math.round(entry).toLocaleString()}<br>
            <b>🛑 Stop Loss:</b> ₹${Math.round(stoploss).toLocaleString()}<br>
            <b>🚀 Target:</b> ₹${Math.round(target).toLocaleString()}
        `;

    } catch (err) {
        result.innerHTML = "❌ Unable to fetch live crypto data.";
    }
 }
setInterval(() => {
    const symbol = document.getElementById("symbol").value.trim();
    if (symbol !== "") {
        startTrading();
    }
}, 10000);
