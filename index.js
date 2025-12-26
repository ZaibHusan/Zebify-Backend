import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectMongoose from './Config/mongoosconnect.js';
import productRoute from './Routes/productRoute.js';
import adminRoute from './Routes/admin.js';
import cors from 'cors';
import userRoute from './Routes/User.js';
import cookieParser from 'cookie-parser';
import cardRouter from './Routes/Card.js';
import cardMiddlewear from './Middlewear/CardMiddlewear.js';
import orderRoute from './Routes/OrderRouter.js';
const app = express();
const PORT = 3000;

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174','https://zebify-admin.vercel.app/'], // your frontend URL
    credentials: true // allow sending cookies
}));
connectMongoose();
app.use(express.json())
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send({ messege: "Server is running" });
})


app.use("/api/products", productRoute);
app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);
app.use("/api/card", cardMiddlewear, cardRouter)
app.use("/api/order", orderRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})