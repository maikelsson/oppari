import { DataSource } from "typeorm";
import { Post } from "./entities/post";
import config from "./config";
import { User } from "./entities/user";

export const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "postgres",
  database: "oppari",
  synchronize: true,
  logging: true,
  entities: [Post, User],
  subscribers: [],
  migrations: [],
});

export default async function createConnection() {
  try {
    console.log("Connecting to db");
    await appDataSource.initialize();
    console.log("Connected to db");
  } catch (error) {
    console.error("Error: ", error);
  }
}
