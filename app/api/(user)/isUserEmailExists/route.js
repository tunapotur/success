import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();

    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");

    const isUserEmailExists = user ? true : false;

    return NextResponse.json({ isUserEmailExists });
  } catch (error) {
    return NextResponse.json(
      {
        message: `An error occurred while finding the user. ${error.message}`,
      },
      { status: 500 },
    );
  }
}
