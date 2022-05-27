import { createExpressServer } from "routing-controllers";
import path from "path";

export default function createServer() {
  return createExpressServer({
    routePrefix: "/api/v1",
    controllers: [path.join(__dirname + "/controllers/*.ts")],
    middlewares: [path.join(__dirname + "/middlewares/*.ts")],
  });
}
