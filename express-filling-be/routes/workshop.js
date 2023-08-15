
import express from "express";
import { getAllWorkshops ,getWorkshopById ,createWorkshop ,getWorkshopPay,getWorkshopNotPay , updateWorkshopById , deleteWorkshopById} from "../controllers/workshop.js";
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from "uuid";
const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/Workshop')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
    }
  });
  
  const upload = multer({storage });

router.get('/' , getAllWorkshops)
router.get('/:id' , getWorkshopById)
router.get('/notpay/:user_id' , getWorkshopNotPay)
router.get('/pay/:user_id' , getWorkshopPay)
router.post('/' , upload.single("img")  , createWorkshop)
router.put('/:id' ,  upload.single("img"),  updateWorkshopById)
router.delete('/:id' , deleteWorkshopById)


export default router
// import express from "express";
// import { 
//     getAllWorkShop,
//     getWorkshopById,
//     saveWorkshop,
//     updateWorkshop,
//     deleteWorkshop, 
//      } 
//     from "../controllers/Workshop.js";
// import multer from "multer";
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/images/Workshop')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
//   })

// const upload = multer({storage });
// const router = express.Router();

// router.get('/helloWorkshop', (req,res)=>{
//     res.json({success:"hello workshop"})
// });

// router.get('/all-data', getAllWorkShop);
// router.get('/get-byId', getWorkshopById);
// router.post('/save', upload.single('image'), saveWorkshop);
// router.put('/update',  upload.single('image') , updateWorkshop);
// router.delete('/delete', deleteWorkshop);


// export default router