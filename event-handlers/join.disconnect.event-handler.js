const { USERS_ONLINE, DISCONNECT, USER_JOIN } = require("../eventTypes");
const _ = require("lodash");

function handleJoin(io, socket, people) {
  socket.on(USER_JOIN, msg => {
    people[socket.id] = msg.username;
    io.emit(USER_JOIN, msg.username + " joined the chat");
    io.emit(USERS_ONLINE, _.values(people));
  });
}

function handleDisconnect(io, socket, people) {
  socket.on(DISCONNECT, () => {
    io.emit(DISCONNECT, people[socket.id] + " left the chat");
    delete people[socket.id];
    io.emit(USERS_ONLINE, _.values(people));
  });
}

module.exports = { handleJoin, handleDisconnect };
