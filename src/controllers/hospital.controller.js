import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

import { Hospital } from "../models/hospial.models.js";


const createHospital = asyncHandler(async(req, res) => {
    const {name, location} = req.body;

    if (!name || !location) {
        throw new ApiError(400, "name or location is required")
    }
    

    const create = await Hospital.create({
        name, location
    })

    if (!create) {
        throw new ApiError(400, "unable to create hospital")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, create, "succesfully created the hospital Schema"))
})

export {
    createHospital,
}