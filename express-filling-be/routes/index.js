import express from "express";
const router = express.Router();

import Auth from "./auth.js";
import Role from "./role.js";
import Feedback from "./feedback.js"
import Kuota from "./kuota.js"
import Payment from "./payment.js"
import Attendance from "./attendance.js"
import User from "./user.js"
import Workshop from "./workshop.js"


//Auth
router.use('/auth' , Auth);

//Roles
router.use('/roles' , Role);

//feedback
router.use('/feedback' , Feedback)

//feedback
router.use('/kuota' , Kuota)


//feedback
router.use('/payment' , Payment)

//Attendance
router.use('/attendance' , Attendance)

//user
router.use('/user' , User)

//user
router.use('/workshop' , Workshop)



export default router;

// import express from "express";
// const router = express.Router();

// import multer from 'multer';
// import path from 'path';

// import { getAccount, Login, Register, Logout } from "../controllers/Account.js";
// import { verifyToken } from "../middleware/verifyToken.js";
// import { refreshToken } from "../controllers/RefreshToken.js";

// import Workshop from "./workshop.js";
// import Account from "./account.js";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const __dirname = path.dirname(new URL(import.meta.url).pathname);
//     cb(null, path.resolve(__dirname, '../uploads'));
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
//   }
// });

// const upload = multer({ storage: storage });

// router.get("/", function (req, res, next) {
//     res.send("masuk");
//   });


// //Account
// router.use('/account' , Account);

// //Workshop
// router.use('/workshop',Workshop);

// export default router;