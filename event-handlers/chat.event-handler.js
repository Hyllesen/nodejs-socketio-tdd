const _ = require("lodash");
const { CHAT_MESSAGE, PRIVATE_MESSAGE } = require("../eventTypes");

function handleChat(io, socket, people) {
  socket.on(CHAT_MESSAGE, msg => {
    msg.from = people[socket.id];
    io.emit(CHAT_MESSAGE, msg);
  });
}

function handlePrivateChat(io, socket, people) {
  socket.on(PRIVATE_MESSAGE, msg => {
    const sockets = _.invert(people);
    const socketIdToMessage = sockets[msg.to];
    msg.from = people[socket.id];
    io.to(socketIdToMessage).emit(PRIVATE_MESSAGE, msg);
  });
}

module.exports = { handleChat, handlePrivateChat };
