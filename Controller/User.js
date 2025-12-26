import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const adduser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            res.send({ success: false, message: "User already exists" });
        }
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        res.cookie("token", token, {
            httpOnly: true,     // prevents client JS from accessing it
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
            sameSite: "Lax"     // important for cross-site requests
        });
        res.send({ success: true, message: "User added successfully", name: user.name, userId: user._id });

    } catch (error) {
        console.log(error);
        res.send({ success: false, message: "Something went wrong" });
    }


}



const loginuser = async (req, res) => {

    if (!req.body) {
        res.send({ success: false, messege: "Please Enter some data before Request" })
    }

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.send({ success: false, messege: "User not found" })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            res.send({ success: false, messege: "invalid user credentials" })
        }
        const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
        res.cookie("token", token, {
            httpOnly: true,     // prevents client JS from accessing it
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
            sameSite: "Lax"     // important for cross-site requests
        });
        res.send({ success: true, messege: "Login Successfully", name: user.name, userId: user._id })
    } catch (error) {
        console.log(error)
        res.send({ success: false, messege: "Some thing went wrong" })
    }


}


const logout = async (req, res) => {
    res.clearCookie('token')
    res.send({ success: true, messege: "Logout Successfully" })
}

export { adduser, loginuser, logout };