import { User } from "../../src/entities/user";
import { UserRepository } from "../../src/repositories/userRepository";

export class UserRepositoryStubBuilder {
  constructor(private findAll: User[] = []) {}

  withFindAll(value: User[]): this {
    this.findAll = value;
    return this;
  }

  build(): UserRepository {
    return new UserRepository();
  }
}
