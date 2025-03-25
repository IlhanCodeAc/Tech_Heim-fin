import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: { type: Array, required: true },  // Ensure this field is validated and passed correctly
  total: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, default: "pending" },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
