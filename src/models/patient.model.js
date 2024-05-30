// models/Patient.js
import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    password: {
        type: String, 
        required: true
    },
    photo: {
        type: String
    }, 
},{timestamps: true}
);

export const Patient = mongoose.model("Patient", patientSchema)
