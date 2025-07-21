//yaha files aayegi file system ke through to ye local file ka path dega means jo b file server pr aa chuki h ab server se local path dpge and then we will upload it on cloudinary and then remove file after successful upload

import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

//for debugging
// console.log({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadOnCloudinary = async(localFilePath)=>{
//     try{
//         if(!localFilePath)return null;
//         //uploading file on the server
//         const response = await cloudinary.uploader.upload(localFilePath,{
//             resource_type:"auto"
//         })
//         //file uploaded successfully 
//         console.log("file is uploaded on cloudinary",response.url);
//         return response;
//     }
//     catch(error){
//         fs.unlinkSync(localFilePath)
//         return null;
//     }
// }
const uploadOnCloudinary = async(localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        console.log("File uploaded on Cloudinary:", response.url);
        fs.unlinkSync(localFilePath); // Delete only after success
        return response;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
}


export {uploadOnCloudinary}