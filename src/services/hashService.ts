import bcrypt from "bcryptjs";

export async function hash(plainPassword: string): Promise<string> {
  return await bcrypt.hash(plainPassword, 12);
}
