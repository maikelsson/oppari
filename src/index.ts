import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import createConnection from "./data-source";
import createServer from "./server";

dotenv.config();

async function main() {
  const PORT = process.env.PORT || 8000;
  const server = createServer();
  await createConnection();

  server.listen(PORT, () => {
    console.log(`Server Running here 👉 http://localhost:${PORT}`);
  });
}

main();
