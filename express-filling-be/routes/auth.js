import express from "express";
import {  register , signin , logout } from "../controllers/auth.js";
const router = express.Router();


router.post('/register' , register)
router.post('/login|signin' , signin)
router.post('/logout|signout' , logout)




export default router