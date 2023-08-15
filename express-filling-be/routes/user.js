import express from "express";
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from "uuid";
import { getAllUser ,getUserById ,createUser  , updateUserById , deleteUserById} from "../controllers/user.js";
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/User')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({storage });

router.get('/' , getAllUser)
router.get('/:id' , getUserById)
router.post('/' , upload.single("img") , createUser)
router.put('/:id' ,upload.single("img") ,  updateUserById)
router.delete('/:id' , deleteUserById)


export default router