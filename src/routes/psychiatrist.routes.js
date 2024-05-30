import {Router} from "express";

import { addPatient, api2, createPsychiatrist } from "../controllers/psychiatrist.controller.js";


const router = Router()

router.route("/create").post(createPsychiatrist)

router.route("/addPatient/:psychiatrist").post(addPatient)

router.route("/fetchDetails/:hospitalId").post(api2)

export default router;