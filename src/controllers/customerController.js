import mongoose from "mongoose";
import Customer from "../models/Customer.js";

export async function getAllCustomers(req, res) {
  try {
    let customers = await Customer.find({});
    res.json({
      success: true,
      customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

export async function getCustomer(req, res) {
  try {
    let customer = await Customer.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
    });
    res.json({
      success: true,
      customer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

export async function createCustomer(req, res) {
  try {
    const { name, phone } = req.body;
    let customer = await Customer.findOne({ name: name });
    if (customer)
      return res.json({ success: false, message: "Customer Already Exist" });

    customer = new Customer({ name, phone });
    await customer.save();
    res.status(201).json({
      success: true,
      message: "customer created successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

export async function updateCustomer(req, res) {
  try {
    const { name, phone } = req.body;
    let customer = await Customer.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
    });
    if (!customer)
      return res.json({ success: false, message: "customer Does not Exist" });

    await Customer.updateOne(
      { _id: mongoose.Types.ObjectId.createFromHexString(req.params.id) },
      { name, phone }
    );

    res.status(201).json({
      success: true,
      message: "customer updated successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

export async function deleteCustomer(req, res) {
  try {
    let customer = await Customer.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
    });
    if (!customer)
      return res.json({ success: false, message: "customer Does not Exist" });

    await Customer.deleteOne({
      _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
    });

    res.status(201).json({
      success: true,
      message: "Customer deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}
