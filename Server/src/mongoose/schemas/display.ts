import mongoose from "mongoose";
const { Schema } = mongoose;

const displaySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Rent",
    },
  ],
});

displaySchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
  },
});

export default mongoose.model("Display", displaySchema);
