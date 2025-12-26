import mongoose, { Query } from "mongoose";


const Orders = new mongoose.Schema({
    user_id: { type: String, required: true },
    product_id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    Unit: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },
    total: { type: Number, required: true },
    address: { type: Array, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: "pending" },
    date: { type: Number, required: true },
})

const Order = mongoose.model("Orders", Orders);

export default Order;