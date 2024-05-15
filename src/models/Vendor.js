import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
},{ timestamps: true });

const Vendor = mongoose.model("Vendor", VendorSchema);
export default Vendor;
