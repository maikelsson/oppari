import { hash } from "../../../src/services/hashService";
import bcrypt from "bcryptjs";

const mockBcrypt = jest
  .spyOn(bcrypt, "hash")
  .mockImplementation(() => Promise.resolve("$2a$12$"));

describe("hashService.ts", () => {
  test("should call hash fn() and hash plaintext password", async () => {
    const sut = await hash("p4ssw0rd");

    expect(sut.startsWith("$2a$12$")).toBeTruthy();
    expect(mockBcrypt).toHaveBeenCalledTimes(1);
  });
});
