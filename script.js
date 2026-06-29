 function startTrading() {
  const symbol = document.getElementById("symbol").value.trim().toUpperCase();
  const result = document.getElementById("result");

  if (symbol === "") {
    result.innerHTML = "⚠️ Please enter a stock or crypto symbol.";
    return;
  }

  const signals = ["🟢 BUY", "🔴 SELL", "🟡 WAIT"];
  const signal = signals[Math.floor(Math.random() * signals.length)];

  result.innerHTML = `
    <b>Symbol:</b> ${symbol}<br>
    <b>AI Signal:</b> ${signal}<br>
    <b>Status:</b> Analysis Complete ✅
  `;
}
