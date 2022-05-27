import { NextFunction, Request } from "express";
import { ExpressMiddlewareInterface } from "routing-controllers";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import config from "../config";

export default class AuthMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, response: Response, next: NextFunction): any {
    try {
      const verified = jwt.verify(
        request.headers.authorization!.replace("Bearer ", ""),
        config.JWT_SECRET!
      );
    } catch (error) {
      throw new Error("JWT ERROR");
    }
    next();
  }
}
