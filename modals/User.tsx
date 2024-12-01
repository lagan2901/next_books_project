import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  cartItems: {
    type: [String],
    default: [],
    ref: "booksdata",
  },
  orderedItems: {
    type: [String],
    default: [],
    ref: "orders",
  },
});

mongoose.models = {};
const User = mongoose.model("users", UserSchema);

export default User;
