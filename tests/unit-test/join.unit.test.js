const joinHandler = require("../../event-handlers/join.event-handler");
const { JOIN, USERS_ONLINE } = require("../../eventTypes");
const MockedSocket = require("socket.io-mock");

let socket = new MockedSocket();
let socket2 = new MockedSocket();
let io = new MockedSocket();

const mockSocketId = "f8d8dnfs8dnf98ns";
socket.id = mockSocketId;
socket2.id = "ifmd9md9m";

let people = {};

const emitSpy = jest.spyOn(io, "emit");

beforeEach(() => {
  joinHandler.handleJoin(io, socket, people);
  joinHandler.handleJoin(io, socket2, people);
});

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
  it("should emit the total users online", () => {
    const testMsg = { username: "Benny" };
    const testMsg2 = { username: "John" };
    socket.socketClient.emit(JOIN, testMsg);
    socket2.socketClient.emit(JOIN, testMsg2);
    console.log(emitSpy.calls);
    expect(io.emit).toHaveBeenCalledWith(USERS_ONLINE, ["Benny", "John"]);
  });
});
