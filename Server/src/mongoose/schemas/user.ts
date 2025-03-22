import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    unique:false

  },
  number: {
    type: Number,
    required: true,
    unique:false
  },
  password: {
    type: String,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordTokenExpires: {
    type: Date,
    default: null,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Cart", 
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
  },
});



export default mongoose.model("User", userSchema);
