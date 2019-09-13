const io = require("socket.io-client");
const server = require("../server");

let client;

beforeAll(done => {
  server.listen(3000);
  client = io.connect("http://localhost:3000", () => {
    done();
  });
});

afterAll(() => {
  server.disconnect();
});

describe("Chat server", () => {
  it("should greet user connecting", done => {
    client.emit("join");
    client.on("joined", data => {
      expect(data).toBe("Welcome to the chat!");
      done();
    });
  });
});
