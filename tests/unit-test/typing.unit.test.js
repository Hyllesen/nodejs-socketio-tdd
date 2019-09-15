const typingHandler = require("../../event-handlers").typingHandler;
const MockedSocket = require("socket.io-mock");
const { USER_TYPING } = require("../../eventTypes");

const socket = new MockedSocket();
const io = new MockedSocket();
socket.id = "JohnSocketId";

jest.spyOn(io, "emit");

const people = {
  di09309jjd: "Receiving Typing User",
  JohnSocketId: "John"
};

describe("TypingHandler", () => {
  it("should send typing to all users when user is typing", () => {
    typingHandler.handleTyping(io, socket, people);
    socket.socketClient.emit(USER_TYPING, {});
    expect(io.emit).toHaveBeenCalledWith(USER_TYPING, ["John"]);
  });
  it("if typing hasnt been called for a while, send update", () => {
    typingHandler.handleTyping(io, socket, people);
    socket.socketClient.emit(USER_TYPING, {});
    expect(io.emit).toHaveBeenCalledWith(USER_TYPING, ["John"]);
    expect(io.emit).toHaveBeenCalledWith(USER_TYPING, []);
  });
});
