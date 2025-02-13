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
    required: false 
  },
  category: {
    type: Types.ObjectId,
    ref: "Category",
    required: true,
  },
  
  processor: {
    type: Types.ObjectId,
    ref: "Processor",
    required: true,
  },
  graphicscard: {
    type: Types.ObjectId,
    ref: "Graphics-card",
    required: true,
  },
  brand: {
    type: Types.ObjectId,
    ref: "Brand",
    required: true,
  },

  capacity: {
    type: Types.ObjectId,
    ref: "Capacity",
    required: true,
  },
  ram:{
    type: Types.ObjectId,
    ref: "Ram",
    required: true,
  },
  display:{
    type: Types.ObjectId,
    ref: "Display",
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
