import mongoose from "mongoose";



const userMongoos = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    orders: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Order" }
    ],
    card: [
        {
            productId: { type: String, required: true },
            Unit: { type: Number, required: true }
        }
    ]
})


const User = mongoose.model("User", userMongoos);
export default User