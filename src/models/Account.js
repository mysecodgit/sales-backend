import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
  },
  accountNumber:{
    type: Number,
    required: true,
  },
  openingBalance: {
    type: Number,
  },
},{ timestamps: true });

const Account = mongoose.model("Account", AccountSchema);
export default Account;
