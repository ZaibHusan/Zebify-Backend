import express from "express"
import { addOrder, getOrder, getOrderadmin, orderclear } from "../Controller/Orders.js";


const orderRoute = express.Router();


orderRoute.get("/", (req, res) => {
    res.send({ success: true, messege: "Request recived it orderRouter" })
})

orderRoute.post("/addorder", addOrder)
orderRoute.post("/getorder", getOrder)
orderRoute.get("/getorderadmin", getOrderadmin)
orderRoute.delete("/orderclear", orderclear)

export default orderRoute;