const express = require("express");
const router = require("./routes/router");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 10000;

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use(express.json());
app.use(express.text());

app.use("/4kfellowhship", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
