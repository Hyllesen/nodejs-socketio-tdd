const { JOIN, USERS_ONLINE } = require("../eventTypes");
const _ = require("lodash");

function handleJoin(io, socket, people) {
  socket.on(JOIN, msg => {
    people[socket.id] = msg.username;
    io.emit(JOIN, msg.username + " joined the chat");
    io.emit(USERS_ONLINE, _.values(people));
  });
}

module.exports = { handleJoin };
