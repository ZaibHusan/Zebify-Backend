import jwt from "jsonwebtoken";
import Order from "../Models/Orderschema.js";

const admin = (req, res) => {
    console.log(req.body);
    const { gmail, password } = req.body;
    try {
        if (password.toLowerCase() === process.env.ADMIN_PASSWORD && gmail.toLowerCase() === process.env.ADMIN_GAMIL) {
            const token = jwt.sign({ gmail, password }, process.env.SECRET_KEY, { expiresIn: '1d' });
            res.json({ success: true, messege: "Login Successfully", token });
        } else {
            res.json({ success: false, messege: "Login Failed" });
        }
    } catch (error) {
        res.json({ success: false, messege: "Login Failed", error });
    }

}

export const orderstatusupdate = async (req, res) => {
    try {
        const { status, id } = req.body;
        if (!id || !status) {
            return res.status(400).json({ success: false, messege: "Order ID and status are required" });
        }
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, messege: "Order not found" });
        }
        order.status = status;
        await order.save();
        res.status(200).json({ success: true, messege: "Order status updated successfully", order });
    } catch (error) {
        console.log("Error in orderstatusupdate:", error);
        res.status(500).json({ success: false, messege: "Something went wrong", error: error.message });
    }
}

export default admin