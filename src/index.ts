import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import createConnection from "./data-source";

dotenv.config();

async function main() {
  const PORT = process.env.PORT || 8000;
  const app: Express = express();
  await createConnection();

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
  });

  app.listen(PORT, () => {
    console.log(`Server Running here 👉 http://localhost:${PORT}`);
  });
}

main();
