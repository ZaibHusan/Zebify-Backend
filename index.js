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

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://zebify-admin.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);


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

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// })