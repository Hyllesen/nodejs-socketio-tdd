const { JOIN } = require("../eventTypes");

function handleJoin(io, socket, people) {
  socket.on(JOIN, msg => {
    people[socket.id] = msg.username;
    io.emit(JOIN, msg.username + " joined the chat");
  });
}

module.exports = { handleJoin };
