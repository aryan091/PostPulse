
const dotenv = require('dotenv').config();

const cloudinary = require('cloudinary').v2;
const fs = require('fs')




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log("uploading file on cloudinary ", localFilePath);
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);
       fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.log('Cloudinary upload error:', error.message);

        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

const deleteFromCloudinary = async (imageUrl) => {
    try {
        if (!imageUrl) return null;

        const public_id = imageUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(public_id);
        console.log("Previous image avatar deleted successfully:", public_id);
        
        return true;
    } catch (error) {
        console.log('Cloudinary deletion error:', error.message);
        return null;
    }
};



module.exports = {uploadOnCloudinary , deleteFromCloudinary}