import jwt from "jsonwebtoken";

export function createToken(userId: number): string {
  const token = jwt.sign(
    {
      user_id: userId,
    },
    process.env.JWT_SECRET || "KEYBOARDCAT",
    {
      expiresIn: "2h",
    }
  );
  return token;
}
