import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategory,
  getProductsByBrand
} from "../controllers/product.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const Productrouter = express.Router();

// No multer needed now
Productrouter.post("/create", verifyToken, isAdmin, createProduct);
Productrouter.put("/update/:id", verifyToken, isAdmin, updateProduct);
Productrouter.get("/all", getAllProducts);
Productrouter.delete("/delete/:id", verifyToken, isAdmin, deleteProduct);

// Search and filters
Productrouter.get("/search", verifyToken, searchProducts);
Productrouter.get("/get/:id", verifyToken, getProductById);
Productrouter.get("/category/:category", verifyToken, getProductsByCategory);
Productrouter.get("/brand/:brand", verifyToken, getProductsByBrand);

export default Productrouter;
