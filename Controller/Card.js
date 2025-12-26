import User from "../Models/User.js";


const addcard = async (req, res) => {
    const { userId, productId, Unit } = req.body;
    if (!userId || !productId || !Unit) {
        res.send({ success: false, messege: "Please Enter some data before Request" })
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.send({ success: false, messege: "User not found" })
        }
        if (user.card.some((item) => item.productId === productId)) {
            const existUnit = user.card.find((item) => item.productId === productId);
            existUnit.Unit += Unit;
            await user.save();
            res.send({ success: true, messege: "Product added to cart" })
        } else {
            user.card.push({ productId, Unit: Unit });
            await user.save();
            res.send({ success: true, messege: "Product added to cart" })
        }
    } catch (error) {

    }
}


const getcard = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        const carddata = user.card;
        if (!carddata) {
            res.send({ success: false, messege: "Usre card info does not found" })
        }
        res.send({ success: true, carddata, messege: "card data fetch successfully!" })
    } catch (error) {
        json.send({ success: false, messege: "Some thing going wrong in get card" })
    }
}

const updatecard = async (req, res) => {
    if (req.card) {
        res.send({ success: false, messege: "please provide card detils" })
    }
    try {
        const { Card, userId } = req.body;
        const user = await User.findById(userId);
        user.card = []
        user.card = Card;
        await user.save();
        res.send({ success: true, messege: "card succesfully update" })

    } catch (error) {
        console.log(error)
        res.send({ success: false, messege: "somthing going wrong" })
    }
}


export { addcard, getcard, updatecard };
