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


const commonCors = cors({
  origin: function (origin, callback) {
    // Allow all origins dynamically
    // When credentials are included, we need to return the specific origin, not '*'
    callback(null, origin || '*');
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
});

app.use(commonCors);


connectMongoose();
app.use(express.json())
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send({ messege: "Server is runnings and every thing is good" });
})


app.use("/api/products", productRoute);
app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);
app.use("/api/card", cardMiddlewear, cardRouter)
app.use("/api/order", orderRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})