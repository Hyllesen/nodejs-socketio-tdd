const io = require("socket.io-client");
const server = require("../server");

let client;

beforeAll(async done => {
  await server.listen(3000);
  client = io.connect("http://localhost:3000");
  done();
});

afterAll(async () => {
  await server.disconnect();
  client.removeAllListeners();
  client.disconnect();
});

describe("Chat server", () => {
  it("should greet user connecting", done => {
    client.once("joined", data => {
      expect(data).toBe("Welcome to the chat");
      expect(data).toBe("Welcome to the chat");
      done();
    });

    client.emit("join");
  });
});
