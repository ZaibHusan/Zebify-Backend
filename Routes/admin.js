
import admin, { orderstatusupdate } from "../Controller/admin.js";
import express from "express";


const adminRoute = express.Router();

adminRoute.post("/", admin);
adminRoute.put("/orderstatusupdate", orderstatusupdate)


export default adminRoute