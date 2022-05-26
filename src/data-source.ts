import { DataSource } from "typeorm";
import { Post } from "./entity/post";

const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "postgres",
  database: "oppari",
  synchronize: true,
  logging: true,
  entities: [Post],
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
