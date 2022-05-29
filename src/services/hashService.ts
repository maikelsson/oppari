import bcrypt from "bcryptjs";

export async function hash(plainPassword: string): Promise<string> {
  return await bcrypt.hash(plainPassword, 12);
}

export async function verify(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
