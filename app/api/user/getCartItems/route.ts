import { NextApiRequest, NextApiResponse } from "next";
import { errorHandler } from "../../../../utils/common";
import User from "../../../../modals/User";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const { userId } = req.body;
  try {
    const books = await User.findById(userId).populate("cartItems");
    return NextResponse.json(books);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        hasError: true,
        errorMessage: "Error in getting cart items",
      },
      { status: 400 }
    );
  }
}
