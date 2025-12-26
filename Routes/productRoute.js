import epxress from "express"
import { adminVerification } from "../Middlewear/Productmilldewear.js";
import { addproducts, deleteproduct, getproducts } from "../Controller/productcontrullar.js";
import { upload } from "../Middlewear/Productmilldewear.js";

const productRoute = epxress.Router();

productRoute.post("/addproducts", adminVerification, upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 }]), addproducts);
productRoute.get("/getproducts", getproducts)
productRoute.delete("/deleteproduct/:id", adminVerification, deleteproduct)

export default productRoute;