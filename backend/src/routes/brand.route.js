import express from 'express';
import { createBrand, getAllBrands, getBrandById, updateBrand, deleteBrand } from '../controllers/brand.controller.js';
import { isAdmin,verifyToken } from '../middleware/auth.middleware.js';

const brandRouter = express.Router();
brandRouter.post("/create",  verifyToken,isAdmin, createBrand);
brandRouter.get("/all",  verifyToken, getAllBrands);
brandRouter.put("/update/:id",  verifyToken,isAdmin, updateBrand);
brandRouter.delete("/delete/:id",  verifyToken,isAdmin, deleteBrand);

export default brandRouter;
