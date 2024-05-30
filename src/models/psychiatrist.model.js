import mongoose from "mongoose";

const psychiatristSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }],
},{
    timestamps: true,
});


export const Psychiatrist = mongoose.model("Psychiatrist", psychiatristSchema)
