/**
 * This is used for file uploads from the api directly, which
 * currently isn't done anywhere.
 */
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  // @ts-ignore
  destination: function (req, file, cb) {
    cb(null, "/tmp/");
  },
  // @ts-ignore
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

export const getMulter = () => multer({ storage: storage });
