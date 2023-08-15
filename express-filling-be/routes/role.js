import express from "express";
import { roles , add , update , remove } from "../controllers/role.js";
const router = express.Router();

router.get('/' , roles)
router.post('/' , add)
router.put('/:id' , update)
router.delete('/:id' , remove)




export default router