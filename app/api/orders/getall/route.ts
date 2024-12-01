import { NextResponse } from "next/server";
import Order from "../../../../modals/Order";

export async function GET() {
  try {
    const orders = await Order.find({}).populate(["bookId", "userId"]);
    return NextResponse.json(orders);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        hasError: true,
        errorMessage: "Error in getting orders",
      },
      { status: 400 }
    );
  }
}
