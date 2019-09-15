const typingHandler = require("../../event-handlers").typingHandler;
const MockedSocket = require("socket.io-mock");
const { USER_TYPING } = require("../../eventTypes");
const _ = require("lodash");
const lolex = require("lolex");

let clock = lolex.install();

const johnSocket = new MockedSocket();
const otherSocket = new MockedSocket();
const io = new MockedSocket();
johnSocket.id = "JohnSocketId";
otherSocket.id = "AnotherTyperId";

jest.spyOn(io, "emit");

const people = {
  di09309jjd: "Receiving Typing User",
  JohnSocketId: "John",
  AnotherTyperId: "AnotherTyper"
};

beforeAll(() => {
  clock = lolex.install();
});

beforeAll(() => {
  typingHandler.handleTyping(io, johnSocket, people);
  typingHandler.handleTyping(io, otherSocket, people);
});

describe("TypingHandler", () => {
  it("should send typing to all users when user is typing", () => {
    johnSocket.socketClient.emit(USER_TYPING, {});
    expect(io.emit).toHaveBeenCalledWith(USER_TYPING, ["John"]);
  });
  it("if typing hasnt been called for a while, send update", () => {
    johnSocket.socketClient.emit(USER_TYPING, {});
    expect(io.emit).toHaveBeenCalledWith(USER_TYPING, ["John"]);
    clock.tick(2000);
    expect(io.emit).toHaveBeenCalledWith(USER_TYPING, []);
  });
  it("should show typing notification for multiple users", () => {
    johnSocket.socketClient.emit(USER_TYPING, {});
    otherSocket.socketClient.emit(USER_TYPING, {});
    expect(io.emit).toHaveBeenCalledWith(USER_TYPING, ["John", "AnotherTyper"]);
  });
  it("should only clear typing of user who expired", () => {
    johnSocket.socketClient.emit(USER_TYPING, {});
    clock.tick(1000);
    otherSocket.socketClient.emit(USER_TYPING, {});
    clock.tick(1000);
    expect(io.emit).toHaveBeenCalledWith(USER_TYPING, ["AnotherTyper"]);
    clock.next();
  });
});
