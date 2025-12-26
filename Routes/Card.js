import express from "express"
import { addcard, getcard, updatecard } from "../Controller/Card.js";

const cardRouter = express.Router();

cardRouter.post("/addcard", addcard);
cardRouter.post("/getcard", getcard);
cardRouter.post("/updatecard", updatecard)


export default cardRouter