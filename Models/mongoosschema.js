import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    Image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    date: { type: Number, required: true },
    bestSeller: { type: Boolean, required: true },
    public_id: { type: Array, required: true },
});


const Product = mongoose.model("Product", productSchema);
export default Product;
