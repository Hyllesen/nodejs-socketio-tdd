const typingHandler = require("../../event-handlers/typing.event-handler");

describe("Typing event handler", () => {
  it("should have a handleTyping event", () => {
    expect(typeof typingHandler.handleTyping).toBe("function");
  });
});
