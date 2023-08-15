import express from "express";
import { getAllKuota ,getKuotaById ,createKuota  , updateKuotaById , deleteKuotaById} from "../controllers/kuota.js";
const router = express.Router();

router.get('/' , getAllKuota)
router.get('/:id' , getKuotaById)
router.post('/' , createKuota)
router.put('/:id' , updateKuotaById)
router.delete('/:id' , deleteKuotaById)


export default router