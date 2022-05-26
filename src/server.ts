import { createExpressServer } from "routing-controllers";
import { PostController } from "./controllers/postController";
import path from "path";

export default function createServer() {
  return createExpressServer({
    routePrefix: "/api/v1",
    controllers: [path.join(__dirname + "/controllers/*.ts")],
  });
}
