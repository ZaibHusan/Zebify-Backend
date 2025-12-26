import jwt from "jsonwebtoken";

const cardMiddlewear = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.send({ success: false, messege: "invalid token please login first " })

        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            res.send({ success: false, messege: "invalid token please login first " })
        }
        const { id } = decode;
        req.body.userId = id;
        next();

    } catch (error) {
        console.log(error);
        res.send({ success: false, messege: "something went wrong" })
    }
}


export default cardMiddlewear;