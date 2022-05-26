import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
} from "routing-controllers";

@Controller()
export class HelloController {
  @Get("/hello")
  getAll() {
    return "Hello World!";
  }
}
