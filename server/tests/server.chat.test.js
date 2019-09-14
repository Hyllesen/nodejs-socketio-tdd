const io = require("socket.io-client");
const server = require("../server");
const {
  JOIN,
  USER_JOINED,
  USER_TYPING,
  CHAT_MESSAGE
} = require("../eventTypes");

let client1, client2;

beforeAll(async () => {
  jest.setTimeout(400);
  await server.listen(3000);
  client1 = io.connect("http://localhost:3000");
  client2 = io.connect("http://localhost:3000");
});

afterAll(async () => {
  await server.disconnect();
});

describe("Chat server", () => {
  it("should display when a user joins public chat", done => {
    client2.once(USER_JOINED, data => {
      expect(data).toBe("Client2 joined the chat");
      done();
    });
    client1.emit(JOIN, { username: "Client1" });
    client2.emit(JOIN, { username: "Client2" });
  });
  it("should display chat message to all other users", done => {
    const testMessage = { message: "Hello client2 from client1!" };
    client2.once(CHAT_MESSAGE, data => {
      expect(data).toStrictEqual(testMessage);
      done();
    });
    client1.emit(CHAT_MESSAGE, testMessage);
  });
  it("should display when user is typing", done => {
    client2.once(USER_TYPING, data => {
      expect(data).toStrictEqual(["Client1"]);
      done();
    });
    client1.emit(USER_TYPING);
  });
});
