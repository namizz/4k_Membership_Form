const express = require("express");
const router = require("./routes/router");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/4kfellowhship", router);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
