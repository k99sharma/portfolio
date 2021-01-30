const { cloudinary } = require('../cloudinary');

const deleteImage = async (thumbnail, projectImage)=>{
    await cloudinary.uploader.destroy(thumbnail);
    await cloudinary.uploader.destroy(projectImage);
}

module.exports = deleteImage;