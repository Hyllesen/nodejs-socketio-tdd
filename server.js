const app = require("express")();
const http = require("http").createServer(app);
const _ = require("lodash");
const io = require("socket.io")(http);
const jwt = require("jsonwebtoken");
const { joinHandler, chatHandler, typingHandler } = require("./event-handlers");
const { CONNECTION } = require("./eventTypes");
const people = {};

io.on(CONNECTION, socket => {
  console.log("socket connected", socket);
  joinHandler.handleJoin(io, socket, people);
  joinHandler.handleDisconnect(io, socket, people);
  chatHandler.handleChat(io, socket);
  chatHandler.handlePrivateChat(io, socket, people);
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
      resolve();
    });
  });
}

module.exports = { listen, disconnect };
