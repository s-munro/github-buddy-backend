const pg = require("pg");

require("dotenv").config();

const localConnection = process.env.localConnectionpwd;

let connection;

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false };
  connection = process.env.DATABASE_URL;
} else {
  connection = localConnection;
}

const sharedConfig = {
  client: "pg",
  connection,
  migrations: { directory: "./api/data/migrations" },
  seeds: { directory: "./api/data/seeds" },
};

module.exports = {
  development: { ...sharedConfig },
  production: {
    ...sharedConfig,
    pool: { min: 2, max: 10 },
  },
};
