const { CHAT_MESSAGE } = require("../eventTypes");

function handleChat(io, socket) {
  socket.on(CHAT_MESSAGE, msg => {
    io.emit(CHAT_MESSAGE, msg);
  });
}

module.exports = { handleChat };
