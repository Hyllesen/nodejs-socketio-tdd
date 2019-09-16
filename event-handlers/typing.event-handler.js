const _ = require("lodash");
const { USER_TYPING } = require("../eventTypes");

const typingNotifications = [];

const clearTypingNotifications = (username, io) => {
  const index = typingNotifications.indexOf(username);
  if (index !== -1) {
    typingNotifications.splice(index, 1);
  }
  io.emit(USER_TYPING, typingNotifications);
};

const MAX_TIMEOUT_TYPING = 2000;

function handleTyping(io, socket, people) {
  const clearTypingNotificationsDebounced = _.debounce(
    clearTypingNotifications,
    MAX_TIMEOUT_TYPING
  );

  socket.on(USER_TYPING, () => {
    const username = people[socket.id];

    if (typingNotifications.indexOf(username) === -1) {
      typingNotifications.push(username);
    }
    io.emit(USER_TYPING, typingNotifications);
    clearTypingNotificationsDebounced(username, io);
  });
}

module.exports = { handleTyping };
