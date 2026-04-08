const socket = io();

socket.on("init", (data) => {
  document.getElementById("balance").innerText =
    "Balance: " + data.balance;
});

socket.on("update", (data) => {
  document.getElementById("balance").innerText =
    "Balance: " + data.balance;
});

socket.on("result", (data) => {
  document.getElementById("result").innerText =
    "Result: " + data.result + (data.win ? " WIN 🎉" : " LOSE ❌");

  document.getElementById("balance").innerText =
    "Balance: " + data.balance;
});

function bet() {
  let amount = document.getElementById("betInput").value;
  socket.emit("bet", Number(amount));
}

function spin() {
  socket.emit("spin");
}
