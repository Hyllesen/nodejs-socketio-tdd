const io = require("socket.io-client");
const server = require("../server");
const eventTypes = require("../eventTypes");

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
    client2.once(eventTypes.USER_JOINED, data => {
      expect(data).toBe("Client2 joined the chat");
      done();
    });
    client1.emit(eventTypes.JOIN, { username: "Client1" });
    client2.emit(eventTypes.JOIN, { username: "Client2" });
  });
});
