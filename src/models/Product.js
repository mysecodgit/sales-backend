import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
},{ timestamps: true });

const Product = mongoose.model("Product", ProductSchema);
export default Product;
