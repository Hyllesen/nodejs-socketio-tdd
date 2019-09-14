const app = require("express")();
const http = require("http").createServer(app);
const _ = require("lodash");
const io = require("socket.io")(http);
const {
  JOIN,
  CHAT_MESSAGE,
  USER_JOINED,
  USER_TYPING
} = require("./eventTypes");

const usersTyping = {};

const people = {};

io.on("connection", socket => {
  socket.on(JOIN, msg => {
    people[socket.id] = msg.username;
    socket.emit(USER_JOINED, msg.username + " joined the chat");
  });
  socket.on(CHAT_MESSAGE, msg => {
    io.emit(CHAT_MESSAGE, msg);
  });
  socket.on(USER_TYPING, msg => {
    usersTyping[socket.id] = people[socket.id];
    io.emit(USER_TYPING, _.values(usersTyping));
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
