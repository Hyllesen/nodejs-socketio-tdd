const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const eventTypes = require("./eventTypes");

io.on("connection", socket => {
  console.log("new connection");
  socket.on(eventTypes.JOIN, msg => {
    socket.emit(eventTypes.USER_JOINED, msg.username + " joined the chat");
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
