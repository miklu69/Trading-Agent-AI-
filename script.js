 function startTrading() {
  const symbol = document.getElementById("symbol").value.toUpperCase();
  const result = document.getElementById("result");

  if (symbol === "") {
    result.innerHTML = "⚠️ Enter a stock symbol";
    return;
  }

  let signal = "🟡 HOLD";
  let entry = "-";
  let stoploss = "-";
  let target = "-";

  switch(symbol){
    case "RELIANCE":
      signal="🟢 BUY";
      entry="₹1480";
      stoploss="₹1465";
      target="₹1515";
      break;

    case "TCS":
      signal="🔴 SELL";
      entry="₹3920";
      stoploss="₹3950";
      target="₹3860";
      break;

    case "INFY":
      signal="🟢 BUY";
      entry="₹1640";
      stoploss="₹1615";
      target="₹1685";
      break;

    case "SBIN":
      signal="🟡 HOLD";
      entry="Wait";
      stoploss="-";
      target="-";
      break;

    default:
      signal="❓ Stock Not Found";
  }

  result.innerHTML=`
  <hr>
  <b>Stock :</b> ${symbol}<br>
  <b>Signal :</b> ${signal}<br>
  <b>Entry :</b> ${entry}<br>
  <b>Stop Loss :</b> ${stoploss}<br>
  <b>Target :</b> ${target}
  `;
 }
