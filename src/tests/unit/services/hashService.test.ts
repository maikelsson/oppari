import { hash, verify } from "../../../services/hashService";
import bcrypt from "bcryptjs";

const mockHash = jest
  .spyOn(bcrypt, "hash")
  .mockImplementation(() => Promise.resolve("$2a$12$"));

const mockCompare = jest
  .spyOn(bcrypt, "compare")
  .mockImplementation(() => Promise.resolve(true));

describe("hashService.ts", () => {
  test("should hash a plaintext password", async () => {
    const result = await hash("p4ssw0rd");

    expect(result.startsWith("$2a$12$")).toBeTruthy();
    expect(mockHash).toHaveBeenCalledTimes(1);
    expect(mockHash).toBeCalledWith("p4ssw0rd", 12);
  });

  test("should verify hashed password and plain password", async () => {
    const result = await verify("password", "$2a$12$");

    expect(result).toBeTruthy();
    expect(mockCompare).toBeCalledTimes(1);
    expect(mockCompare).toBeCalledWith("password", "$2a$12$");
  });
});
