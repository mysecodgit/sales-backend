import mongoose from "mongoose";
import Account from "../models/Account.js";

export async function getAllAccounts(req, res) {
  try {
    let accounts = await Account.find({});
    res.json({
      success: true,
      accounts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

export async function getAccount(req, res) {
  try {
    let account = await Account.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
    });
    res.json({
      success: true,
      account,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

export async function createAccount(req, res) {
  try {
    const { accountName, accountNumber, openingBalance } = req.body;
    let account = await Account.findOne({ accountName });
    if (account)
      return res.json({ success: false, message: "Account Already Exist" });

    account = new Account({ accountName, accountNumber, openingBalance });
    await account.save();
    res.status(201).json({
      success: true,
      message: "account created successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

export async function updateAccount(req, res) {
  try {
    const { accountName, accountNumber, openingBalance } = req.body;
    let account = await Account.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
    });
    if (!account)
      return res.json({ success: false, message: "account Does not Exist" });

    await Account.updateOne(
      { _id: mongoose.Types.ObjectId.createFromHexString(req.params.id) },
      { accountName, accountNumber, openingBalance }
    );

    res.status(201).json({
      success: true,
      message: "account updated successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

export async function deleteAccount(req, res) {
  try {
    let account = await Account.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
    });
    if (!account)
      return res.json({ success: false, message: "account Does not Exist" });

    await Account.deleteOne({
      _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
    });

    res.status(201).json({
      success: true,
      message: "Account deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}
