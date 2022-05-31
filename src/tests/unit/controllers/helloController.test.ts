import { HelloController } from "../../../controllers/helloController";

describe("helloController.ts", () => {
  test("getAll should return Hello World!", () => {
    const sut = new HelloController();
    const result = sut.getAll();
    expect(result).toBe("Hello World!");
  });
});
