import mongoose from "mongoose";
import Vendor from "../models/Vendor.js";

export async function getAllVendors(req, res) {
  try {
    let vendors = await Vendor.find({});
    res.json({
      success: true,
      vendors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

export async function getVendor(req, res) {
  try {
    let vendor = await Vendor.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
    });
    res.json({
      success: true,
      vendor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

export async function createVendor(req, res) {
  try {
    const { name, phone } = req.body;
    let vendor = await Vendor.findOne({ name: name });
    if (vendor)
      return res.json({ success: false, message: "Vendor Already Exist" });

    vendor = new Vendor({ name, phone });
    await vendor.save();
    res.status(201).json({
      success: true,
      message: "Vendor created successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

export async function updateVendor(req, res) {
  try {
    const { name, phone } = req.body;
    let vendor = await Vendor.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
    });
    if (!vendor)
      return res.json({ success: false, message: "Vendor Does not Exist" });

    await Vendor.updateOne(
      { _id: mongoose.Types.ObjectId.createFromHexString(req.params.id) },
      { name, phone }
    );

    res.status(201).json({
      success: true,
      message: "Vendor updated successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

export async function deleteVendor(req, res) {
  try {
    let vendor = await Vendor.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
    });
    if (!vendor)
      return res.json({ success: false, message: "Vendor Does not Exist" });

    await Vendor.deleteOne({
      _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
    });

    res.status(201).json({
      success: true,
      message: "Vendor deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}
