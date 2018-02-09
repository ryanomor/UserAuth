const pgp = require("pg-promise")({});
const connectionString = "postgres://localhost/userlist";
const db = pgp(connectionString);

module.exports = db;