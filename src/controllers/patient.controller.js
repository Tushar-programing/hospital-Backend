import { asyncHandler } from "../utils/asyncHandler.js"

import { ApiError } from "../utils/apiError.js"
import { Patient } from "../models/patient.model.js"

import { uploadOnCloudinary } from "../utils/cloudinary.js"
import mongoose from "mongoose"

import { ApiResponse } from "../utils/apiResponse.js"


const createPatient = asyncHandler(async(req, res) => {
    const {name, address, email, phone, password} = req.body
    console.log(name, address, email, phone, password);

    if (!name || !address || !email || !phone || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const photo = req.file?.path

    if (!photo) {
        throw new ApiError(400, "photo is not found")
    }
    // console.log(photo);

    const upload = await uploadOnCloudinary(photo)
    
    // console.log(upload);

    if (!upload.url) {
        throw new ApiError(400, "unable to upload image on server")
    }

    const create = await Patient.create({
        name, address, email, phone, password, photo: upload.url
    })

    if (!create) {
        throw new ApiError(400, "unable to send patient details to server")
    }

    return res
    .status(400)
    .json(new ApiResponse(200, create, "succesfully created the patient details"))

})



export {
    createPatient,
}
