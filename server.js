const app = require("express")();
const http = require("http").createServer(app);
const _ = require("lodash");
const io = require("socket.io")(http);
const { joinHandler, chatHandler, typingHandler } = require("./event-handlers");

const people = {};

io.on("connection", socket => {
  joinHandler.handleJoin(io, socket, people);
  chatHandler.handleChat(io, socket);
  typingHandler.handleTyping(io, socket, people);
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
