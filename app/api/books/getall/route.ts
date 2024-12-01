import { NextApiRequest, NextApiResponse } from "next";
import Books from "../../../../modals/Books";
import { errorHandler } from "../../../../utils/common";
import { NextResponse } from "next/server";
import connect from "../../../../lib/database";

export async function GET() {
  console.log("in api");
  try {
    await connect();
    //@ts-ignore
    const books = await Books.find({}).limit(80);
    return NextResponse.json(books);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        hasError: true,
        errorMessage: "Error in getting books",
      },
      { status: 400 }
    );
    // errorHandler(err, res);
  }
}
