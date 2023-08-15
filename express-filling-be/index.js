import express from "express";
import multer from "multer";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./config/Database.js";
import router from "./routes/index.js";
import User from "./models/UserModel.js";
import cors from "cors";
import bodyParser from "body-parser";




dotenv.config();
const app = express();

try{
    await db.authenticate();
    console.log('Database Connected...');
    await User.sync();
} catch (error){
    console.error(error);
}

app.use(cookieParser());

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(express.static("public"));
// app.use(fileUpload());


app.listen(8000, ()=> console.log('Server running at port 8000'));