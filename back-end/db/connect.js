const { Pool } = require("pg");

const pool = new Pool({
  user: "fourkfellowship_user",
  host: "dpg-cvk4c315pdvs73a2e390-a.oregon-postgres.render.com",
  database: "fourkfellowship",
  password: "3M1l3Mru1hg6u4GwzQGisedwKnPlb0Az",
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Disable certificate validation (only for development)
  },
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS members (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    date_of_birth DATE,
    church VARCHAR(100),
    country VARCHAR(100),
    phone VARCHAR(20),
    region VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    department VARCHAR(100),
    batch VARCHAR(30),
    img TEXT,
    fav_verse VARCHAR(255),
    password VARCHAR(255)
  );
`;
const createTable = async () => {
  try {
    const client = await pool.connect();
    await client.query(createTableQuery);
    console.log("Table created or already exists.");
    client.release();
  } catch (err) {
    console.error("Error creating table:", err);
  }
};

// Create the table when the app starts
createTable();

module.exports = pool;
