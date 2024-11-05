const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "aau_4k_fellowship_members",
  password: "1234nnamii1234",
  port: "5432",
});
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to the database", err.stack);
  } else {
    console.log("Database connected successfully");
    release();
  }
});
module.exports = pool;
