const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", socket => {
  console.log("new connection");
  socket.on("join", () => {
    console.log("a user joined");
    socket.emit("joined", "Welcome to the chat");
  });
});

async function listen(port) {
  return new Promise(resolve => {
    http.listen(port, () => {
      console.log("Socket io server running on " + port);
      resolve();
    });
  });
}

async function disconnect() {
  return new Promise(resolve => {
    io.close(() => {
      console.log("server disconnected");
      resolve();
    });
  });
}

module.exports = { listen, disconnect };
