const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let users = {};

function randomNumber() {
  return Math.floor(Math.random() * 75) + 1;
}

io.on("connection", (socket) => {
  users[socket.id] = { balance: 100 };

  socket.emit("init", users[socket.id]);

  socket.on("bet", (amount) => {
    if (users[socket.id].balance >= amount) {
      users[socket.id].balance -= amount;
    }
    socket.emit("update", users[socket.id]);
  });

  socket.on("spin", () => {
    let result = randomNumber();
    let win = result > 50;

    if (win) users[socket.id].balance += 10;

    socket.emit("result", {
      result,
      win,
      balance: users[socket.id].balance
    });
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
  });
});

server.listen(3000, () => {
  console.log("Bingo Casino running on port 3000");
});
