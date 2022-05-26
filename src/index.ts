import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Server Running here 👉 http://localhost:${PORT}`);
});
