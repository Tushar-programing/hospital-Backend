import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";

import { Psychiatrist } from "../models/psychiatrist.model.js";
import { Hospital } from "../models/hospial.models.js";

const createPsychiatrist = asyncHandler(async(req, res) => {
    const {name, hospital, patient} = req.body
    console.log(name, hospital, patient);

    if (!name || !hospital || !patient) {
        throw new ApiError(400, "all fields are required")
    }

    const create = await Psychiatrist.create({
        name, hospital, patients: patient
    })

    if (!create) {
        throw new ApiError(400, "unable to create Psychiatrist data")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, create, "succefully created the Psychiatrist"))
})

const addPatient = asyncHandler(async(req, res) => {
    const {patient} = req.body;
    const {psychiatrist} = req.params;

    console.log(patient, psychiatrist);

    if (!patient || !psychiatrist) {
        throw new ApiError(400, "all fields are required")
    }

    const get = await Psychiatrist.findById(psychiatrist);

    if (!get) {
        throw new ApiError(400, "unable to find the psychiatrist")
    }
    get.patients.push(patient)

    const main = await get.save();

    if (!main) {
        throw new ApiError(400, "unable to save psychiatrist")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, main, "succefully added patient to the psychiatrist"))

})

const api2 = asyncHandler(async(req, res) => {
    const {hospitalId} = req.params;

    if (!hospitalId) {
        throw new ApiError(400, "hospitalId is not found")
    }

    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
        throw new ApiError(400, "unable to find the hospitalId")
    }

    const psychiatrists = await Psychiatrist.find({ hospital: hospitalId });

    if (!psychiatrists) {
        throw new ApiError(400, "no psychiatrists result data found")
    }

    let totalPatientsCount = 0;
    for (const psychiatrist of psychiatrists) {
        totalPatientsCount += psychiatrist.patients.length;
    }


    const response =  {
        hospitalName: hospital.name,
        totalPsychiatristCount: psychiatrists.length,
        totalPatientsCount: totalPatientsCount,
        psychiatrists: psychiatrists.map(psychiatrist => ({
            id: psychiatrist._id,
            name: psychiatrist.name,
            patientsCount: psychiatrist.patients.length
        }))
    }

    return res
    .status(200)
    .json(new ApiResponse(200, response, "succefully fetch the details"))    

})


// const api2 = asyncHandler(async(req, res) => {
//     const {hospitalId} = req.params;

//     if (!hospitalId) {
//         throw new ApiError(400, "hospitalId is not found")
//     }

//     const response = await Psychiatrist.aggregate([
//         {
//             $match: {
//                 hospital: new mongoose.Types.ObjectId(hospitalId),
//             }
//         },
//         {

//         }
//     ])

//     console.log(response);

//     return res
//     .status(200)
//     .json(new ApiResponse(200, response, "succefully fetch the details"))    

// })

export {
    createPsychiatrist,
    addPatient,
    api2,
}