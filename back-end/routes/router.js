//take out some function
//create a controller and chec
const { upload } = require("../imageupload/cloudinary");

const { Router } = require("express");
const {
  getAll,
  createUserInfo,
  ImageUpp,
  getID,
} = require("../controller/controller");

const router = Router();

router.get("/", getAll);
router.post("/", createUserInfo);
router.post("/upload", upload.single("file"), ImageUpp);
router.get("/:id", getID);

module.exports = router;
