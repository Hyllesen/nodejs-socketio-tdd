const _ = require("lodash");
const { USER_TYPING } = require("../eventTypes");

const typingNotifications = [];

const clearTypingNotifications = (username, io) => {
  console.log("clear typing notif");
  const index = typingNotifications.indexOf(username);
  if (index !== -1) {
    typingNotifications.splice(index, 1);
  }
  io.emit(USER_TYPING, typingNotifications);
};

const clearTypingNotificationsDebounced = _.debounce(
  clearTypingNotifications,
  2000
);

function handleTyping(io, socket, people) {
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
