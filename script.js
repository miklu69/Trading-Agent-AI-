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
        if (change > 2) signal = "🟢 BUY";
        if (change < -2) signal = "🔴 SELL";

        result.innerHTML = `
            <hr>
            <h3>${symbol}</h3>
            <b>Live Price:</b> ₹${price}<br>
            <b>24h Change:</b> ${change.toFixed(2)}%<br>
            <b>AI Signal:</b> ${signal}
        `;
    } catch (err) {
        result.innerHTML = "❌ Unable to fetch live crypto data.";
    }
}
