import express from "express";
import { adduser, loginuser, logout } from "../Controller/User.js";


const userRoute = express.Router();


userRoute.get("/", (req, res) => {
    res.send({ messege: "Server is running" });
})

userRoute.post("/adduser", adduser)
userRoute.post("/loginuser", loginuser)
userRoute.delete("/logout", logout)


export default userRoute