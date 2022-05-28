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
import { createToken } from "../services/tokenService";
import { hash } from "../services/hashService";
import { UserRepository } from "../repositories/userRepository";
import { Repository } from "typeorm";
import { Service } from "typedi";

export interface UserInput {
  username: string;
  password: string;
}

@JsonController("/auth")
@Service()
export class AuthController {
  constructor(private userRepository: UserRepository) {}
  // TODO : Move to usercontroller
  @Get("/all")
  async getAll() {
    const users = await this.userRepository.findAll();
    return { users };
  }

  @Post("/register")
  async register(@Body() payload: UserInput) {
    try {
      const hashedPassword = await hash(payload.password);
      await this.userRepository.insert({
        username: payload.username,
        password: hashedPassword,
      });
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

  // @Post("/login")
  // async login(@Body() payload: UserInput) {
  //   try {
  //     const user = await this.userRepository.findOneBy({
  //       username: payload.username,
  //     });
  //     if (!user) {
  //       return { message: "invalid credentials" };
  //     }
  //     if (user?.password !== payload.password) {
  //       return { message: "invalid credentials" };
  //     }

  //     const token = createToken(user.id);
  //     return { token };
  //   } catch (error) {
  //     return {
  //       error,
  //     };
  //   }
  // }
}
