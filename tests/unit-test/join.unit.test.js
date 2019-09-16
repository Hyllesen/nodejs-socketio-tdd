const joinHandler = require("../../event-handlers/join.event-handler");
const {
  USER_JOIN,
  USERS_ONLINE,
  DISCONNECT,
  USER_LEFT
} = require("../../eventTypes");
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
  joinHandler.handleDisconnect(io, socket, people);
  joinHandler.handleDisconnect(io, socket2, people);
});

describe("Join Handler", () => {
  it("should have a handleJoin function", () => {
    expect(typeof joinHandler.handleJoin).toBe("function");
  });
  it("should emit Welcome to chat to other users", () => {
    joinHandler.handleJoin(io, socket, people);
    const testMsg = { username: "Benny" };
    socket.socketClient.emit(USER_JOIN, testMsg);
    expect(io.emit).toHaveBeenCalledWith(
      USER_JOIN,
      testMsg.username + " joined the chat"
    );
    expect(people[mockSocketId]).toBe(testMsg.username);
  });
  it("should emit the total users online", () => {
    const testMsg = { username: "Benny" };
    const testMsg2 = { username: "John" };
    socket.socketClient.emit(USER_JOIN, testMsg);
    socket2.socketClient.emit(USER_JOIN, testMsg2);
    expect(io.emit).toHaveBeenCalledWith(USERS_ONLINE, ["Benny", "John"]);
  });
  it("should show leave message and update users online", () => {
    const testMsg = { username: "Benny" };
    const testMsg2 = { username: "John" };
    socket.socketClient.emit(USER_JOIN, testMsg);
    socket2.socketClient.emit(USER_JOIN, testMsg2);
    socket.socketClient.emit(DISCONNECT, {});
    expect(io.emit).toHaveBeenCalledWith(DISCONNECT, "Benny left the chat");
    expect(io.emit).toHaveBeenCalledWith(USERS_ONLINE, ["John"]);
  });
});
