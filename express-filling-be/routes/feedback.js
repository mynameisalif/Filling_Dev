import express from "express";
import { getAllFeedback ,getFeedbackById ,createFeedback , getAllByWorkshopByUser  , updateFeedbackById , deleteFeedbackById , getAllByWorkshop} from "../controllers/feedback.js";
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from "uuid";
const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/Feedback')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
    }
  });
  
  const upload = multer({storage });


router.get('/' , getAllFeedback)
router.get('/:id' , getFeedbackById)
router.get('/detail/:workshop_id' , getAllByWorkshop)
router.get('/detail/:workshop_id/:user_id' , getAllByWorkshopByUser)


router.post('/'  , upload.single("image") , createFeedback)
router.put('/:id' , updateFeedbackById)
router.delete('/:id' , deleteFeedbackById)


export default router