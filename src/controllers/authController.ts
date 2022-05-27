import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  UseBefore,
} from "routing-controllers";
import { appDataSource } from "../data-source";
import { User } from "../entities/user";
import { createToken } from "../services/tokenService";
import { hash } from "../services/hashService";

interface UserInput {
  username: string;
  password: string;
}

@JsonController("/auth")
export class AuthController {
  private userRepository = appDataSource.getRepository(User);

  // TODO : Move to usercontroller
  @Get("/all")
  async getAll() {
    const users = await this.userRepository.find();
    return { users };
  }

  @Post("/register")
  async register(@Body() payload: UserInput) {
    try {
      const hashedPassword = await hash(payload.password);
      const user = await this.userRepository.create({
        username: payload.username,
        password: hashedPassword,
      });
      await this.userRepository.save(user);
      return { message: "Register success" };
    } catch (error: any) {
      if (error.code === "23505") {
        return {
          error: "Username is already taken",
        };
      }
      return {
        error: "Register failure",
      };
    }
  }

  @Post("/login")
  async login(@Body() payload: UserInput) {
    try {
      const user = await this.userRepository.findOneBy({
        username: payload.username,
      });
      if (!user) {
        return { message: "invalid credentials" };
      }
      if (user?.password !== payload.password) {
        return { message: "invalid credentials" };
      }

      const token = createToken(user.id);
      return { token };
    } catch (error) {
      return {
        error,
      };
    }
  }
}
