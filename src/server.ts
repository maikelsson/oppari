import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import path from "path";

useContainer(Container);

export default function createServer() {
  return createExpressServer({
    routePrefix: "/api/v1",
    controllers: [path.join(__dirname + "/controllers/*.ts")],
    middlewares: [path.join(__dirname + "/middlewares/*.ts")],
  });
}
