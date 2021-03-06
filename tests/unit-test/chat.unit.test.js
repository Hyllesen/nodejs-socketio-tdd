const chatHandler = require("../../event-handlers").chatHandler;
const { CHAT_MESSAGE, PRIVATE_MESSAGE } = require("../../eventTypes");
const MockedSocket = require("socket.io-mock");

const socket = new MockedSocket();
const client2 = new MockedSocket();
const io = new MockedSocket();

jest.spyOn(io, "emit");

const emitMock = jest.fn();

let ioWithTo = {
  to: jest.fn(() => ({ emit: emitMock }))
};

socket.id = "fdmoidmfdim";

people = {
  fdmoidmfdim: "ClientUser1",
  fidoimfds9: "ClientUser2"
};

describe("ChatHandler", () => {
  it("Send chat message to all users", () => {
    const testMessage = { message: "Hello everyone!" };
    chatHandler.handleChat(io, socket, people);
    socket.socketClient.emit(CHAT_MESSAGE, testMessage);
    expect(io.emit).toHaveBeenCalledWith(CHAT_MESSAGE, {
      ...testMessage,
      from: "ClientUser1"
    });
  });

  it("should be able to send private message to another user", () => {
    chatHandler.handlePrivateChat(ioWithTo, socket, people);
    chatHandler.handlePrivateChat(ioWithTo, client2, people);
    socket.socketClient.emit(PRIVATE_MESSAGE, {
      to: "ClientUser2",
      message: "Hi Client2!"
    });
    expect(emitMock).toHaveBeenCalledWith(PRIVATE_MESSAGE, {
      to: "ClientUser2",
      message: "Hi Client2!",
      from: "ClientUser1"
    });
    expect(ioWithTo.to).toHaveBeenCalledWith("fidoimfds9");
  });
});
