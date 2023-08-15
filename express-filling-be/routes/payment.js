import express from "express";
import { getAllPayment ,getPaymentById ,createPayment, checkUniqCode , getPaymentApprove , updatePaymentById , deletePaymentById} from "../controllers/payment.js";
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from "uuid";
const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/Payment')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
    }
  });
  
  const upload = multer({storage });


router.get('/' , getAllPayment)
router.get('/list-approve' , getPaymentApprove)
router.get('/check-uniq-code/:uniq_code' , checkUniqCode)
router.get('/:id' , getPaymentById)
router.post('/'  , upload.single("bukti_pembayaran"), createPayment)
router.put('/:id' , upload.single("bukti_pembayaran") ,  updatePaymentById)
router.delete('/:id' , deletePaymentById)


export default router