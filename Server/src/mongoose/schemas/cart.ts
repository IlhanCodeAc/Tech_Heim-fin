import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  product: {
    type: Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0, 
  },
  discountPercentage: {
    type: Number,
    default: 0, 
  },
});

const cartSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [cartItemSchema],
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  currency: {
    type: String,
    default: "USD",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

cartSchema.pre("save", function (next) {
  this.total = this.items.reduce((sum, item) => {
    const discountAmount = item.discount;
    const discountPercentage = item.discountPercentage;
    const finalPrice = (item.price - discountAmount) * (1 - discountPercentage / 100);
    return sum + finalPrice * item.quantity;
  }, 0);
  next();
});

cartSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
  },
});

export default mongoose.model("Cart", cartSchema);
