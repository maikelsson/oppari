import { AuthController } from "../../../src/controllers/authController";
import { UserRepository } from "../../../src/repositories/userRepository";
import { User } from "../../../src/entities/user";

const mockUserRepository = new (<new () => UserRepository>(
  UserRepository
))() as jest.Mocked<UserRepository>;
mockUserRepository.findAll = jest
  .fn()
  .mockImplementation(() =>
    Promise.resolve([
      { id: 1, username: "mock-user1", password: "$2a$12$" } as User,
      { id: 2, username: "mock-user2", password: "$2a$12$" } as User,
    ])
  );

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
			
		});
  });
});
