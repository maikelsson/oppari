import { Controller, Get } from "routing-controllers";

@Controller()
export class HelloController {
  @Get("/hello")
  getAll() {
    return "Hello World!";
  }
}
