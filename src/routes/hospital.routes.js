import {Router} from "express";
import { createHospital } from "../controllers/hospital.controller.js";


const router = Router()

router.route("/create").post(createHospital)

export default router;