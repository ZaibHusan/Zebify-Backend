import Product from "../Models/mongoosschema.js";
import Order from "../Models/Orderschema.js";
import User from "../Models/User.js";




const addOrder = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ success: false, messege: "Please provide order details" })
    }
    const formdata = req.body.formdata;
    if (!formdata) {
        return res.status(400).json({ success: false, messege: "Please provide valid fromData" })
    }
    try {
        const {
            name,
            email,
            address,
            paymentMethod,
            product,
            userId,
            phone
        } = formdata;
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, messege: "User not found" })
        }
        product.map(async (item) => {
            const product = await Product.findById(item.productId);
            if (product) {
                const newOrder = new Order({
                    username: name,
                    email: email,
                    phone: parseInt(phone),
                    user_id: userId,
                    name: product.name,
                    product_id: item.productId,
                    Unit: item.Unit,
                    shippingFee: parseInt(process.env.DELEVEIRY_FEE),
                    price: product.price,
                    total: (parseInt(item.Unit) * parseInt(product.price)) + parseInt(process.env.DELEVEIRY_FEE),
                    address: address,
                    paymentMethod: paymentMethod,
                    date: Date.now(),
                })
                console.log("The new order is ", newOrder)
                await newOrder.save()
            }
        }
        )
        res.status(201).json({ success: true, messege: "Order successfully added" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, messege: "Something went wrong", error: error.message })
    }
}






const getOrder = async (req, res) => {
    const { userId } = req.body
    if (!userId) {
        return res.status(400).json({ success: false, messege: "Please provide user id" })
    }
    try {
        const orders = await Order.find();
        const filteredOrders = orders.filter((order) => order.user_id === userId);
        res.status(200).json({ success: true, filteredOrders })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, messege: "Something went wrong", error: error.message })
    }
}




const getOrderadmin = async (req, res) => {
    try {
        const ordersadmin = await Order.find();
        if (!ordersadmin || ordersadmin.length === 0) {
            return res.status(200).json({ success: true, ordersadmin: [], messege: "No orders found" });
        }
        res.status(200).json({ success: true, ordersadmin })
    } catch (error) {
        console.log("Error in getOrderadmin:", error);
        res.status(500).json({ success: false, messege: "Something went wrong", error: error.message })
    }
}

const orderclear = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, messege: "Please provide order id" })
        }
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, messege: "Order not found" })
        }
        const orderstatus = order.status;
        if (orderstatus === "delivered") {
            await Order.findByIdAndDelete(id);
            return res.status(200).json({ success: true, messege: "Order deleted successfully" })
        }
        res.status(400).json({ success: false, messege: "Order cannot be deleted - not yet delivered" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, messege: "Something went wrong", error: error.message })
    }
}

export { addOrder, getOrder, getOrderadmin, orderclear }









