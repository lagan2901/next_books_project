// pages/api/getOneUser.js
import jwt from "jsonwebtoken";
import User from "../../../../modals/User"; // Your User model
import { NextResponse } from "next/server";

// JWT secret key (stored in .env.local)
const JWT_SECRET = "asdas223";

export async function GET(req, res) {
  try {
    const token = req.headers.get("authorization"); // Extract token from query parameters
    console.log(token);
    if (!token) {
      return NextResponse.json(
        { message: "Token not provided" },
        { status: 400 }
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET); // Decode the token
    const { email, id }: any = decoded; // Extract email and userId from the token
    console.log(decoded);
    const user = await User.findOne({ email, _id: id });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Send the user data in response
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error in fetching user" },
      { status: 500 }
    );
  }
}
