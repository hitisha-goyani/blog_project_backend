import{v2 as cloudinary} from "cloudinary"

cloudinary.config({

cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

console.log("Cloud Name:", process.env.CLOUDINARY_NAME);
console.log("Cloud Key:", process.env.CLOUDINARY_API_KEY);
console.log("Cloud Secret:", process.env.CLOUDINARY_SECRET);

export default cloudinary