const pool = require("../db/connect");
const database = require("../db/queries");
const { upload } = require("../imageupload/cloudinary");
const books = require("../bibleverse/book");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  const { phone, password } = req.body;
  console.log(req.body);

  try {
    const result = await pool.query("select * from members where phone=$1", [
      phone,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const pass = password
      ? password === user.password
      : user.password === null
      ? true
      : null;
    console.log(pass, password, user.password);

    if (!pass) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Create the payload based on whether `password` is provided
    const payload = { phone: user.phone };
    if (password) payload.password = user.password;

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getAll = async (req, res) => {
  console.log("Get API");

  const { phone, password } = req.query; // Destructure both phone and password from the query params

  try {
    let sqlQuery = "SELECT * FROM members"; // Replace 'your_table' with your actual table name

    // Add WHERE clause if phone and password are provided
    if (phone && password) {
      sqlQuery += ` WHERE phone = $1 AND password = $2`; // Check both phone and password
    } else if (phone) {
      sqlQuery += ` WHERE phone = $1`; // Only check phone if password is not provided
    }

    // Execute the query with or without filtering based on query parameters
    const result = await pool.query(
      sqlQuery,
      phone && password ? [phone, password] : phone ? [phone] : []
    );
    res.json(result.rows); // Return the query result as a JSON response
  } catch (error) {
    console.error("Error in extracting information", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getID = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(database.getByID, [id]);
    if (result.rows.length == 0) {
      res.send(`There is no ${id} id found`).status(404);
      return;
    }
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const createUserInfo = async (req, res) => {
  console.log("DataRecieved");
  const {
    firstname,
    lastname,
    date_of_birth,
    church,
    country,
    phone,
    region,
    email,
    department,
    batch,
    img,
    fav_verse,
  } = req.body;
  console.log("req.body", JSON.stringify(req.body, null, 2));
  // check for email duplication
  try {
    ////////////////please hand the message in the front end;
    const p = await pool.query(database.checkEmail, [phone]);
    if (p.rowCount > 0) {
      return res
        .status(400)
        .json({ msg: "You have inserted an existing phone number" });
    } else {
      // console.log("Executing query:", database.createMember);
      // console.log("Parameters:", [
      //   firstname,
      //   lastname,
      //   date_of_birth,
      //   church,
      //   country,
      //   phone,
      //   region,
      //   email,
      //   department,
      //   batch,
      //   img,
      //   fav_verse,
      // ]);
      await pool.query(database.createMember, [
        firstname,
        lastname,
        date_of_birth === "" ? null : date_of_birth,
        church,
        country,
        phone,
        region,
        email,
        department,
        batch,
        img,
        fav_verse,
      ]);
      console.log("this should be the end of the be");
      return res.status(201).json({ msg: "Successfully added" });
    }
  } catch (error) {
    console.error("Error");
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// udate function
const update = async (req, res) => {
  console.log("req.body", JSON.stringify(req.body, null, 2));
  const {
    firstname,
    lastname,
    date_of_birth,
    church,
    country,
    phone,
    region,
    email,
    department,
    batch,
    img,
    fav_verse,
    password,
  } = req.body;

  try {
    await pool.query(database.updateMember, [
      firstname,
      lastname,
      date_of_birth === "" ? null : date_of_birth,
      church,
      country,
      phone,
      region,
      email,
      department,
      batch === "" ? null : parseInt(batch),
      img,
      fav_verse,
      password,
      phone,
    ]);
    res.status(200).send({ msg: "Successfully updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "database update unsuccessful" });
  }
};

// delete function
const remove = (req, res) => {
  const p = req.query.phone;
  if (!p) {
    return res.status(400).send({ msg: "Phone number is required to delete" });
  }
  pool.query(database.deleteById, [p]);
  res.status(200).send({ msg: "Successfully deleted" });
};

// Image uploader
const ImageUpp = (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ msg: "File upload failed" });
    }
    const fileUrl = req.file.path; // Get the URL from Cloudinary
    console.log("Uploaded file URL:", fileUrl);
    res.status(200).json({ fileUrl });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ msg: "Server error during file upload" });
  }
};

const bibleverse = (req, res) => {
  const bookNumber = parseInt(req.params.id, 10);
  if (bookNumber >= 1 && bookNumber <= books.length) {
    res.json({ bookName: books[bookNumber - 1] }); // Subtract 1 since array is 0-indexed
  } else {
    res.status(400).json({ error: "Invalid book number" });
  }
};

module.exports = {
  getAll,
  createUserInfo,
  getID,
  ImageUpp,
  update,
  bibleverse,
  remove,
  login,
};
