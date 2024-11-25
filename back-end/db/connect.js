const { Pool } = require("pg");

const pool = new Pool({
  user: "arat_kilo_fellowship_user",
  host: "ct2afb52ng1s73ecsvf0-a.oregon-postgres.render.com", // Use the correct host provided by Render
  database: "arat_kilo_fellowship",
  password: "SZMSfvGxUW9vm2FkWktH21PN2PMg5iJU",
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Disable certificate validation (only for development)
  },
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
