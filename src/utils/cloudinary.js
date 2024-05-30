import {v2 as cloudinary} from "cloudinary"
import fs from "fs"



const uploadOnCloudinary = async (localFilePath) => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    // console.log("cloudinary" ,localFilePath);
    try {
        if (!localFilePath) return null
        // console.log("woking 1");
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // console.log("woking 1");

        // file has been uploaded successfull
        // console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        // console.log("woking 1");

        return response;

    } catch (error) {
        // console.log(error);
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}


export {uploadOnCloudinary}