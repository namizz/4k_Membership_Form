const { Pool } = require("pg");

const pool = new Pool({
  user: "arat_kilo_fellowship_gbc1_user",
  host: "ctshupggph6c738c7lqg-a.oregon-postgres.render.com", // Use the correct host provided by Render
  database: "arat_kilo_fellowship_gbc1",
  password: "YpR40QV7H1K794ZqHGM5xLsVtwbbY4Vo",
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
