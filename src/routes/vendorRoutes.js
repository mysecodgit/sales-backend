// Import required modules and configuration
import express from "express";
import {
  getAllVendors,
  getVendor,
  createVendor,
  updateVendor,
  deleteVendor,
} from "../controllers/vendorController.js";

const router = express.Router();

router.get("/", getAllVendors);
router.get("/:id", getVendor);
router.post("/", createVendor);
router.put("/:id", updateVendor);
router.delete("/:id", deleteVendor);

export default router;
