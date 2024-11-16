//take out some function
//create a controller and chec
const { upload } = require("../imageupload/cloudinary");

const { Router } = require("express");
const {
  getAll,
  createUserInfo,
  ImageUpp,
  getID,
  update,
  bibleverse,
  remove,
  login,
} = require("../controller/controller");

const router = Router();

router.get("/", getAll);
router.get("/api/book/:id", bibleverse);
router.post("/", createUserInfo);
router.post("/upload", upload.single("file"), ImageUpp);
router.get("/:id", getID);
router.patch("/edit", update);
router.delete("/", remove);
router.post("/login", login);

module.exports = router;
