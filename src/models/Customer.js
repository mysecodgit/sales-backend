import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
},{ timestamps: true });

const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;
