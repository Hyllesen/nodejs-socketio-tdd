const chatHandler = require("./chat.event-handler");
const joinHandler = require("./join.event-handler");
const typingHandler = require("./typing.event-handler");

module.exports = {
  chatHandler,
  joinHandler,
  typingHandler
};
