// Import required modules and configuration
import express from "express";
import {
  getAllAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
} from "../controllers/accountController.js";

const router = express.Router();

router.get("/", getAllAccounts);
router.get("/:id", getAccount);
router.post("/", createAccount);
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);

export default router;
