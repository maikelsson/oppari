import { createToken } from "../../../src/services/tokenService";
import jwt from "jsonwebtoken";

const mockSign = jest
  .spyOn(jwt, "sign")
  .mockImplementation(
    () =>
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  );

describe("tokenService.ts", () => {
  test("should create jwt token", () => {
    const sut = createToken(1);

    expect(sut.startsWith("eyJhbGciOiJIU")).toBeTruthy();
    expect(mockSign).toHaveBeenCalledWith(
      { user_id: 1 },
      expect.anything(),
      expect.anything()
    );
    expect(mockSign).toBeCalled();
  });
});
