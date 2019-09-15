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

function handleTyping(io, socket, people) {
  const clearTypingNotificationsDebounced = _.debounce(
    clearTypingNotifications,
    2000
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
