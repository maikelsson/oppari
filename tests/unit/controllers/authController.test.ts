import { AuthController } from "../../../src/controllers/authController";
import { UserRepository } from "../../../src/repositories/userRepository";
import { User } from "../../../src/entities/user";
import * as hashService from "../../../src/services/hashService";

const mockUserRepository = new (<new () => UserRepository>(
  UserRepository
))() as jest.Mocked<UserRepository>;

mockUserRepository.findAll = jest.fn(() =>
  Promise.resolve([
    { id: 1, username: "mock-user1", password: "$2a$12$" } as User,
    { id: 2, username: "mock-user2", password: "$2a$12$" } as User,
  ])
);

mockUserRepository.findByName = jest.fn(({}) =>
  Promise.resolve({
    id: 1,
    username: "user",
    password: "password",
  } as User)
);

import jwt from "jsonwebtoken";

jest.spyOn(jwt, "sign").mockImplementation(() => "m0ck.JwtT0k3n.53cr3t");

import bcrypt from "bcryptjs";
jest.spyOn(bcrypt, "hash").mockImplementation(() => Promise.resolve("$2a$12$"));
//jest.spyOn(bcrypt, "compare").mockImplementation(() => Promise.resolve(true));
describe("authController.ts", () => {
  const sut = new AuthController(mockUserRepository);
  describe("initialization", () => {
    test("AuthController should be defined", () => {
      expect(sut).toBeDefined();
    });
    test("UserRepository should be defined", () => {
      expect(mockUserRepository).toBeDefined();
    });
  });
  describe("getAll", () => {
    test("should return list of users", async () => {
      const result = await sut.getAll();

      expect(result.users[0].username).toBe("mock-user1");
      expect(mockUserRepository.findAll).toBeCalledTimes(1);
    });
  });
  describe("register", () => {
    test("should register user with valid input", async () => {
      mockUserRepository.insert = jest.fn().mockImplementation(() => {
        Promise.resolve();
      });

      const result = await sut.register({ username: "mock", password: "mock" });

      expect(result).toStrictEqual({ message: "Register success" });
    });

    test("should throw error when username already exists", async () => {
      mockUserRepository.insert = jest.fn().mockImplementation(() => {
        throw new Error("Register failure");
      });

      const result = await sut.register({ username: "mock", password: "mock" });

      expect(result).toEqual({ error: "Register failure" });
    });
  });

  describe("login", () => {
    test("should return jwt token with valid credentials", async () => {
      jest.spyOn(hashService, "verify").mockReturnValue(Promise.resolve(true));
      const input = { username: "user", password: "password" };

      const result = await sut.login(input);

      expect(result.token).toEqual("m0ck.JwtT0k3n.53cr3t");
    });
    test("should not create jwt token with wrong password", async () => {
      jest.spyOn(hashService, "verify").mockReturnValue(Promise.resolve(false));

      const result = await sut.login({
        username: "user",
        password: "wrongpassword",
      });

      expect(result.message).toBe("invalid credentials");
    });

    test("should not create jwt token with wrong username and password", async () => {
      mockUserRepository.findByName = jest.fn((_) => Promise.resolve(null));

      const result = await sut.login({
        username: "user1",
        password: "wrongpassword",
      });

      expect(result.message).toBe("invalid credentials");
    });
  });
});
