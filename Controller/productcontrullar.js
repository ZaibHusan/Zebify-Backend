import cloudinary from "../Config/Cloudinary.js";
import Product from "../Models/mongoosschema.js";

const addproducts = async (req, res) => {
    console.log("Request Received");

    try {
        if (!req.files) return res.status(400).json({ success: false, messege: "Please upload all the images" });

        if (!req.body) {
            res.json({ success: false, messege: "Please Enter some data before Request" })
        }

        const { name, description, price, category, date, subCategory, bestSeller } = req.body;
        console.log(req.body);
        const image = [];
        const files = req.files;
        const public_id = [];
        for (let i = 0; i <= 3; i++) {
            const fileField = `image${i + 1}`;
            image.push(files[fileField][0].path);
            public_id.push(files[fileField][0].filename);
        }
        const addproudct = new Product({
            name,
            description,
            price,
            Image: image,
            subCategory,
            category,
            date,
            bestSeller,
            public_id
        })
        await addproudct.save().then(() => console.log("Product Sucessfully stored"));
        res.json({ success: true, messege: "product Successfully added!" })
    } catch (error) {
        console.log(error);
    }
}

const getproducts = async (req, res) => {
    try {
        const productData = await Product.find();
        res.send({ success: true, productData })
    } catch (error) {
        console.log(error);
        res.send({ success: false });
    }
}



const deleteproduct = async (req, res) => {
    const productId = req.params.id;
    console.log(productId);
    try {
        const deleteProduct = await Product.findByIdAndDelete(productId);
        if (!deleteProduct) {
            res.json({ success: false, messege: "Product not found" });
        }

        if (deleteProduct.public_id) {
            for (let i = 0; i < deleteProduct.public_id.length; i++) {
                await cloudinary.uploader.destroy(deleteProduct.public_id[i]);
            }
        }

        res.json({ success: true, messege: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, messege: "Product not found" });
    }
}

export { addproducts, getproducts, deleteproduct };