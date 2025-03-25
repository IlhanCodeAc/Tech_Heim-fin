import mongoose from "mongoose";

const { Schema } = mongoose;

const paymentMethodSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  cardNumber: { type: String, required: true }, // Store securely (hashed/encrypted)
  cvv: { type: String, required: true }, // Store securely (hashed/encrypted)
  expiryDate: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("PaymentMethod", paymentMethodSchema);
