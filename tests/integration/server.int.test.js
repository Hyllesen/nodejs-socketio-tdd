const io = require("socket.io-client");
const server = require("../../server");
const {
  USER_JOIN,
  USER_TYPING,
  CHAT_MESSAGE,
  DISCONNECT,
  PRIVATE_MESSAGE
} = require("../../eventTypes");

let client1, client2;

beforeAll(async () => {
  jest.setTimeout(300);
  await server.listen(3001);
  client1 = io.connect("http://localhost:3001");
  client2 = io.connect("http://localhost:3001");
});

afterAll(async () => {
  await server.disconnect();
});

describe("Chat server", () => {
  it("should display when a user joins public chat", done => {
    client2.once(USER_JOIN, data => {
      expect(data).toBe("Client1 joined the chat");
      done();
    });
    client1.emit(USER_JOIN, { username: "Client1" });
    client2.emit(USER_JOIN, { username: "Client2" });
  });
  it("should display chat message to all other users", done => {
    const testMessage = { message: "Hello client2 from client1!" };
    client2.once(CHAT_MESSAGE, data => {
      expect(data).toStrictEqual(testMessage);
      console.log(data);

      done();
    });
    client1.emit(CHAT_MESSAGE, testMessage);
  });
  it("should display when user is typing", done => {
    client2.once(USER_TYPING, data => {
      console.log(data);
      expect(data).toStrictEqual(["Client1"]);
      done();
    });
    client1.emit(USER_JOIN, { username: "Client1" });
    client2.emit(USER_JOIN, { username: "Client2" });
    client1.emit(USER_TYPING);
  });
  it("should display join message", done => {
    client1.once(USER_JOIN, data => {
      expect(data).toBe("Client1 joined the chat" || "Client2 joined the chat");
      done();
    });
    client1.emit(USER_JOIN, { username: "Client1" });
    client2.emit(USER_JOIN, { username: "Client2" });
  });
  it("should be able to send private messages", done => {
    client2.once(PRIVATE_MESSAGE, data => {
      expect(data).toStrictEqual({
        to: "Client2",
        message: "Hey Client2!",
        from: "Client1"
      });
      done();
    });
    client1.emit(USER_JOIN, { username: "Client1" });
    client2.emit(USER_JOIN, { username: "Client2" });
    client1.emit(PRIVATE_MESSAGE, { to: "Client2", message: "Hey Client2!" });
  });
  it("should display when a user disconnects", done => {
    client2.once(DISCONNECT, data => {
      expect(data).toBe("Client1 left the chat");
      done();
    });
    client1.emit(DISCONNECT, {});
  });
});
