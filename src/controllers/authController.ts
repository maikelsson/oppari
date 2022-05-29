import { NextFunction } from "express";
import { Body, Get, JsonController, Post } from "routing-controllers";
import { Service } from "typedi";
import { UserRepository } from "../repositories/userRepository";
import { hash, verify } from "../services/hashService";
import { createToken } from "../services/tokenService";

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
    } catch (error: unknown) {
      return {
        error: "Register failure",
      };
    }
  }

  @Post("/login")
  async login(@Body() payload: UserInput) {
    try {
      const user = await this.userRepository.findByName(payload.username);
      if (!user) {
        return { message: "invalid credentials" };
      }
      const isValidPassword = await verify(payload.password, user.password);
      if (!isValidPassword) {
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
