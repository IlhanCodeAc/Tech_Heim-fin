import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  showInRecommendation: {
    type: Boolean,
    default: false,
  },
  category: {
    type: Types.ObjectId,
    ref: "Category",
    required: true,
  },
  
  processor: {
    type: String,
    default: "", 
  },
  graphicscard: {
    type: String,
    default: "",
  },
  brand: {
    type: String,
    default: "",
  },

  capacity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "USD",
  },
  discount: {
    type: Number,
    default: 0,
  },
  images: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reviews: {
    type: [Types.ObjectId],
    ref: "Review",
    default: [],
  },
});

productSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
  },
});

export default mongoose.model("Product", productSchema);
