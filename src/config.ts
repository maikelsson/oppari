var path = require("path");

const dotenvAbsolutePath = path.join(__dirname, "../.env");

/* INFO: Require dotenv package for retieving and setting env-vars at runtime via absoliute path due to pkg */

const dotenv = require("dotenv").config({
  path: dotenvAbsolutePath,
});
if (dotenv.error) {
  console.log(`ERROR WHILE READING ENV-VARS:${dotenv.error}`);
  throw dotenv.error;
}

export = {
  NODE_PORT: process.env.NODE_PORT,
  PG_USER: process.env.POSTGRES_USER,
  PG_PASSWORD: process.env.POSTGRES_PASSWORD,
  PG_PORT: process.env.POSTGRES_PORT,
  PG_DB: process.env.POSTGRES_DB,
  JWT_SECRET: process.env.JWT_SECRET,
};
