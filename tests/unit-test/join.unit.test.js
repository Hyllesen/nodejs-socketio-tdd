const joinHandler = require("../../event-handlers/join.event-handler");
const { JOIN } = require("../../eventTypes");
const MockedSocket = require("socket.io-mock");

let socket = new MockedSocket();
let io = new MockedSocket();

const mockSocketId = "f8d8dnfs8dnf98ns";
socket.id = mockSocketId;

let people = {};

jest.spyOn(io, "emit");

describe("Join Handler", () => {
  it("should have a handleJoin function", () => {
    expect(typeof joinHandler.handleJoin).toBe("function");
  });
  it("should emit Welcome to chat to other users", () => {
    joinHandler.handleJoin(io, socket, people);
    const testMsg = { username: "Benny" };
    socket.socketClient.emit(JOIN, testMsg);
    expect(io.emit).toHaveBeenCalledWith(
      JOIN,
      testMsg.username + " joined the chat"
    );
    expect(people[mockSocketId]).toBe(testMsg.username);
  });
});
