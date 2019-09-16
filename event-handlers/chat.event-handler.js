const _ = require("lodash");
const { CHAT_MESSAGE, PRIVATE_MESSAGE } = require("../eventTypes");

function handleChat(io, socket) {
  socket.on(CHAT_MESSAGE, msg => {
    io.emit(CHAT_MESSAGE, msg);
  });
}

function handlePrivateChat(io, socket, people) {
  socket.on(PRIVATE_MESSAGE, msg => {
    const sockets = _.invert(people);
    const socketIdToMessage = sockets[msg.to];
    io.to(socketIdToMessage).emit(PRIVATE_MESSAGE, msg);
  });
}

module.exports = { handleChat, handlePrivateChat };
