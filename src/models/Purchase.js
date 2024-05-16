import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    purchaseNo: {
      type: String,
    },
    unique_id: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    vendor_id: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", AccountSchema);
export default Account;
