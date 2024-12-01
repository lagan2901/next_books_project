import { NextResponse } from "next/server";
import User from "../../../../modals/User";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const emailId = searchParams.get("emailId");
  console.log(emailId);
  try {
    const user = await User.findOne({ email: emailId }).populate({
      path: "orderedItems",
      populate: "bookId",
    });
    console.log(user);
    return NextResponse.json(user.orderedItems);
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
