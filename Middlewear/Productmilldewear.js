import multer from "multer";
import cloudinary from "../Config/Cloudinary.js"
import { CloudinaryStorage } from "multer-storage-cloudinary";
import jwt from "jsonwebtoken";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "zebify_media",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        // public_id will be generated automatically if not provided
    },
});

export const upload = multer({ storage: storage });


export const adminVerification = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, messege: "No token provided" });
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) return res.status(401).json({ success: false, messege: "Invalid token" });

    try {
        const { gmail, password } = decode;
        if (password.toLowerCase() === process.env.ADMIN_PASSWORD && gmail.toLowerCase() === process.env.ADMIN_GAMIL) {
            next();
        } else {
            res.status(401).json({ success: false, messege: "Invalid token" });
        }
    } catch (error) {

    }
}
