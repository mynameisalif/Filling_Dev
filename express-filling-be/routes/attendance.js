import express from "express";
import { getAllAttendance ,getAttendanceById ,createAttendance  , updateAttendanceById , deleteAttendanceById} from "../controllers/userAttendance.js";
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from "uuid";
const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/Attendance')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
    }
  });
  
  const upload = multer({storage });

router.get('/' , getAllAttendance)
router.get('/:id' , getAttendanceById)
router.post('/', upload.single("image") , createAttendance)
router.put('/:id' , updateAttendanceById)
router.delete('/:id' , deleteAttendanceById)

export default router