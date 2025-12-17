import Brand from "../models/brand.model.js";
import mongoose from "mongoose";
import NodeCache from "node-cache";

// NodeCache with 1 hour TTL
const brandCache = new NodeCache({ stdTTL: 3600 });

// Helper: flush brand cache
const flushBrandCache = () => brandCache.flushAll();

// CREATE Brand
export const createBrand = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Brand name is required" });
    }

    const existing = await Brand.findOne({ name }).session(session);
    if (existing) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Brand already exists" });
    }

    const brand = new Brand({ name, description });
    await brand.save({ session });

    await session.commitTransaction();
    session.endSession();

    flushBrandCache(); // clear cache after write

    res.status(201).json({ message: "Brand created successfully", brand });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Create Brand Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET ALL Brands (with cache)
export const getAllBrands = async (req, res) => {
  try {
    const cached = brandCache.get("allBrands");
    if (cached) {
      return res.status(200).json({ brands: cached, source: "cache" });
    }

    const brands = await Brand.find().sort({ createdAt: -1 }).lean();
    brandCache.set("allBrands", brands);

    res.status(200).json({ brands, source: "db" });
  } catch (error) {
    console.error("Get All Brands Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET Brand by ID
export const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid brand ID" });
    }

    const brand = await Brand.findById(id);
    if (!brand) return res.status(404).json({ message: "Brand not found" });

    res.status(200).json({ brand });
  } catch (error) {
    console.error("Get Brand By ID Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// UPDATE Brand
export const updateBrand = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid brand ID" });
    }

    const updated = await Brand.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, session }
    );

    if (!updated) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Brand not found" });
    }

    await session.commitTransaction();
    session.endSession();

    flushBrandCache(); // clear cache after update

    res.status(200).json({ message: "Brand updated successfully", brand: updated });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Update Brand Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE Brand
export const deleteBrand = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid brand ID" });
    }

    const deleted = await Brand.findByIdAndDelete(id, { session });
    if (!deleted) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Brand not found" });
    }

    await session.commitTransaction();
    session.endSession();

    flushBrandCache(); // clear cache after delete

    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Delete Brand Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
