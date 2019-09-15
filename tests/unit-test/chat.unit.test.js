const chatHandler = require("../../event-handlers").chatHandler;
const { CHAT_MESSAGE } = require("../../eventTypes");
const MockedSocket = require("socket.io-mock");

const socket = new MockedSocket();
const io = new MockedSocket();

jest.spyOn(io, "emit");

describe("ChatHandler", () => {
  it("Send chat message to all users", () => {
    const testMessage = "Hello everyone!";
    chatHandler.handleChat(io, socket);
    socket.socketClient.emit(CHAT_MESSAGE, testMessage);
    expect(io.emit).toHaveBeenCalledWith(CHAT_MESSAGE, testMessage);
  });
});
