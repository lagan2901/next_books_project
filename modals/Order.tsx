import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: "users",
  },
  bookId: {
    type: String,
    required: true,
    ref: "booksdata",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    default: 1,
  },
});

mongoose.models = {};
const Order = mongoose.model("orders", OrderSchema);

export default Order;
