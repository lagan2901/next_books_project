import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import User from "../../../../modals/User";
import { getValue, validateUser } from "../../../../utils/common";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { fullname, email, password }: any = await req.json();
    console.log(fullname, email, password);
    const payload = { email, password };
    const response_validate = validateUser({ email, password, fullname });
    if (response_validate.error) {
      return NextResponse.json(
        {
          hasError: true,
          errorMessage: getValue(
            response_validate.error,
            ["details", "0", "message"],
            "Error in form"
          ),
        },
        {
          status: 400,
        }
      );
    }

    const rest = await User.findOne({ email: email });
    if (rest) {
      return NextResponse.json(
        {
          hasError: true,
          errorMessage: "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    const newUser = new User({
      email,
      password: await hash(password, 12),
      name: fullname,
    });
    const response_save = await newUser.save();
    if (response_save != null) {
      // @ts-ignore
      const _user = response_save?._doc;
      delete _user.password;
      const token = jwt.sign(
        { id: _user._id, email: _user.email },
        "asdas223",
        {
          expiresIn: "1h", // Adjust expiration as needed
        }
      );
      return NextResponse.json({ _user, token });
    } else {
      return NextResponse.json(
        {
          hasError: true,
          errorMessage: "Error in saving user",
        },
        {
          status: 400,
        }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        hasError: true,
        errorMessage: err,
      },
      {
        status: 500,
      }
    );
  }
}
