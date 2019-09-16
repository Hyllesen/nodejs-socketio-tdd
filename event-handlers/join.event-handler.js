const { JOIN, USERS_ONLINE, DISCONNECT, USER_LEFT } = require("../eventTypes");
const _ = require("lodash");

function handleJoin(io, socket, people) {
  socket.on(JOIN, msg => {
    people[socket.id] = msg.username;
    io.emit(JOIN, msg.username + " joined the chat");
    io.emit(USERS_ONLINE, _.values(people));
  });
}

function handleDisconnect(io, socket, people) {
  socket.on(DISCONNECT, () => {
    io.emit(USER_LEFT, people[socket.id] + " left the chat");
    delete people[socket.id];
    io.emit(USERS_ONLINE, _.values(people));
  });
}

module.exports = { handleJoin, handleDisconnect };
