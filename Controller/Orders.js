import Product from "../Models/mongoosschema.js";
import Order from "../Models/Orderschema.js";
import User from "../Models/User.js";




const addOrder = async (req, res) => {
    if (!req.body) {
        res.send({ success: false, messege: "please provide order details" })
    }
    const formdata = req.body.formdata;
    if (!formdata) {
        res.send({ success: false, messege: "please provide valid fromData" })
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
            res.send({ success: false, messege: "User not found" })
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
        res.send({ success: true, messege: "order successfully added" })

    } catch (error) {
        console.log(error)
        res.send({ success: false, messege: "something going wrong" })
    }
}






const getOrder = async (req, res) => {
    const { userId } = req.body
    if (!userId) {
        res.send({ success: false, messege: "please provide user id" })
    }
    try {
        const orders = await Order.find();
        const filteredOrders = orders.filter((order) => order.user_id === userId);
        res.send({ success: true, filteredOrders })
    } catch (error) {
        console.log(error)
        res.send({ success: false, messege: "something going wrong" })
    }
}




const getOrderadmin = async (req, res) => {
    try {
        const ordersadmin = await Order.find();
        res.send({ success: true, ordersadmin })
    } catch (error) {
        console.log(error)
        res.send({ success: false, messege: "something going wrong" })
    }
}

const orderclear = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            res.send({ success: false, messege: "please provide order id" })
        }
        const order = await Order.findById(id);
        const orderstatus = order.status;
        if (orderstatus === "delivered") {
            await Order.findByIdAndDelete(id);
            res.send({ success: true, messege: "order deleted successfully" })
        }
    } catch (error) {
        console.log(error)
        res.send({ success: false, messege: "something going wrong" })
    }
}

export { addOrder, getOrder, getOrderadmin, orderclear }









