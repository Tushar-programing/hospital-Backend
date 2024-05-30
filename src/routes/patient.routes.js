import {Router} from "express";

import { upload } from "../middlewares/multer.middlewares.js";
import { createPatient } from "../controllers/patient.controller.js";


const router = Router()

router.route("/create").post(upload.single("photo"), createPatient)

export default router;