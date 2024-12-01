import { NextResponse } from "next/server";
import Order from "../../../../modals/Order";
import User from "../../../../modals/User";

export async function POST(req: Request) {
  try {
    const { bookItems, emailId } = await req.json();
    const promises = [];
    const user = await User.findOne({ email: emailId });
    for (let i = 0; i < bookItems.length; i++) {
      const order = new Order();
      order.userId = user._id.toString();
      order.bookId = bookItems[i]._id;
      order.price = bookItems[i].price;
      order.quantity = bookItems[i].quantity;
      const priomise = order.save();
      promises.push(priomise);
    }
    const data = await Promise.all(promises);
    const orderIds = data.map((data1) => data1._id);
    const user1 = await User.findByIdAndUpdate(
      user._id,
      { $push: { orderedItems: { $each: orderIds } } },
      { new: true }
    );
    return NextResponse.json(user1);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        hasError: true,
        errorMessage: "Error in placing order",
      },
      { status: 400 }
    );
  }
}
