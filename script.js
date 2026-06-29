
const API_KEY = "d916r9hr01qr1uqu8hkgd916r9hr01qr1uqu8hl0";

async function startTrading() {
    const symbol = document.getElementById("symbol").value.toUpperCase().trim();
    const result = document.getElementById("result");

    if (!symbol) {
        result.innerHTML = "⚠️ Enter a stock symbol";
        return;
    }

    result.innerHTML = "⏳ Loading...";

    try {
        const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=NSE:${symbol}&token=${API_KEY}`
        );

        const data = await response.json();

        if (!data.c) {
            result.innerHTML = "❌ Stock not found";
            return;
        }

        let signal = "HOLD";

        if (data.c > data.pc) {
            signal = "🟢 BUY";
        } else if (data.c < data.pc) {
            signal = "🔴 SELL";
        }

        result.innerHTML = `
            <hr>
            <b>Stock:</b> ${symbol}<br>
            <b>Current Price:</b> ₹${data.c}<br>
            <b>Previous Close:</b> ₹${data.pc}<br>
            <b>High:</b> ₹${data.h}<br>
            <b>Low:</b> ₹${data.l}<br>
            <b>AI Signal:</b> ${signal}
        `;
    } catch (e) {
        result.innerHTML = "❌ Error loading live data";
    }
}
