import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "../../../../modals/User";

export async function POST(
  req: Request,
) {
  try {
    const { email, password }: any = await req.json();
    console.log(email, password);

    // Validate if both fields are provided
    if (!email || !password) {
      return NextResponse.json(
        {
          hasError: true,
          errorMessage: "Email and password are required",
        },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          hasError: true,
          errorMessage: "User does not exist",
        },
        { status: 400 }
      );
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        {
          hasError: true,
          errorMessage: "Invalid credentials",
        },
        { status: 400 }
      );
    }

    // Remove password from user data before returning
    const _user = user.toObject();
    delete _user.password;

    // Create JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, "asdas223", {
      expiresIn: "1h", // Adjust expiration as needed
    });

    return NextResponse.json(
      {
        user: _user,
        token,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        hasError: true,
        errorMessage: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
