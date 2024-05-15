import mongoose from "mongoose";
import Product from "../models/Product.js";

export async function getAllProducts(req, res) {
  try {
    let products = await Product.find({});
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

export async function getProduct(req, res) {
  try {
    let product = await Product.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
    });
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

export async function createProduct(req, res) {
  try {
    const { name, image } = req.body;
    let product = await Product.findOne({ name: name });
    if (product)
      return res.json({ success: false, message: "Product Already Exist" });

    product = new Product({ name, image });
    await product.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

export async function updateProduct(req, res) {
  try {
    const { name, image } = req.body;
    let product = await Product.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
    });
    if (!product)
      return res.json({ success: false, message: "Product Does not Exist" });

    await Product.updateOne(
      { _id: mongoose.Types.ObjectId.createFromHexString(req.params.id) },
      { name, image }
    );

    res.status(201).json({
      success: true,
      message: "Product updated successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    let product = await Product.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
    });
    if (!product)
      return res.json({ success: false, message: "Product Does not Exist" });

    await Product.deleteOne({
      _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
    });

    res.status(201).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}
