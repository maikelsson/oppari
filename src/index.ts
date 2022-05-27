import "reflect-metadata";
import createConnection from "./data-source";
import createServer from "./server";
import config from "./config";

async function main() {
  const PORT = config.NODE_PORT;
  const server = createServer();
  await createConnection();

  server.listen(PORT, () => {
    console.log(`Server Running here 👉 http://localhost:${PORT}`);
  });
}

main();
