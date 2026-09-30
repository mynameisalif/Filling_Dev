import express from "express";
import { 
  getAllPayment, 
  getPaymentById, 
  createPayment, 
  checkUniqCode, 
  getPaymentApprove, 
  updatePaymentById, 
  deletePaymentById, 
  verifyPaymentWithAI,
  getCertificateByCode
} from "../controllers/payment.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'public/images/Payment';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

router.get('/', getAllPayment);
router.get('/list-approve', getPaymentApprove);
router.get('/check-uniq-code/:uniq_code', checkUniqCode);

// Route Verifikasi E-Sertifikat Publik (QR Code Validator)
router.get('/certificate/:code', getCertificateByCode);
router.get('/verify-certificate/:code', getCertificateByCode);

// Route verifikasi AI (dukung format dash maupun underscore, method GET & POST)
router.get('/verify-ai/:id', verifyPaymentWithAI);
router.post('/verify-ai/:id', verifyPaymentWithAI);
router.get('/verify_ai/:id', verifyPaymentWithAI);
router.post('/verify_ai/:id', verifyPaymentWithAI);

router.get('/:id', getPaymentById);
router.post('/', upload.single("bukti_pembayaran"), createPayment);
router.put('/:id', upload.single("bukti_pembayaran"), updatePaymentById);
router.delete('/:id', deletePaymentById);

export default router;