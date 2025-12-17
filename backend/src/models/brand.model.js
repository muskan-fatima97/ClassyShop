import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: { type: String, unique: true, trim: true, required: true },
  description: { type: String, default:"" },
  
}, { timestamps: true });

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
