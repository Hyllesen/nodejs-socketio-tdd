const chatHandler = require("../../event-handlers").chatHandler;
const { CHAT_MESSAGE } = require("../../eventTypes");
const MockSocket = require("socket.io-mock");

const socket = new MockSocket();
const io = new MockSocket();

jest.spyOn(io, "emit");

describe("ChatHandler", () => {
  it("Send chat message to all users", () => {
    const testMessage = "Hello everyone!";
    chatHandler.handleChat(io, socket);
    socket.socketClient.emit(CHAT_MESSAGE, testMessage);
    expect(io.emit).toHaveBeenCalledWith(CHAT_MESSAGE, testMessage);
  });
});
