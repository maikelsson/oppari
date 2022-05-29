import { appDataSource } from "../data-source";
import { User } from "../entities/user";
import { FindOptionsWhere, QueryFailedError, Repository } from "typeorm";
import { Service } from "typedi";
import { UserInput } from "../controllers/authController";

@Service()
export class UserRepository {
  private repository: Repository<User> = appDataSource.getRepository(User);

  async findAll(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  async insert(input: UserInput): Promise<void> {
    const result = this.repository.create(input);
    await this.repository.save(result);
  }

  async findByName(username: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ username });
    return user;
  }
}
