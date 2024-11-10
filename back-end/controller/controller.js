const pool = require("../db/connect");
const database = require("../db/queries");
const { upload } = require("../imageupload/cloudinary");
const books = require("../bibleverse/book");

const getAll = async (req, res) => {
  console.log("Get API");
  try {
    const result = await pool.query(database.getAllInfo);
    console.log(result);
    res.json(result.rows);
  } catch (error) {
    console.error("Error in extracting information");
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
  const { phonenum } = req.query;
  console.log(phonenum);
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
      batch,
      img,
      fav_verse,
      phone,
    ]);
    res.status(200).send({ msg: "Successfully updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "database update error" });
  }
};

// delete function

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
};
