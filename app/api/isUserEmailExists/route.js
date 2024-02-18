import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();

    const { email } = await req.json();
    const dbUser = await User.findOne({ email }).select("_id");

    const isUserEmailExist = dbUser ? true : false;

    return NextResponse.json({ isUserEmailExist });
  } catch (error) {
    return NextResponse.json(
      {
        message: `An error occurred while finding the user. ${error.message}`,
      },
      { status: 500 },
    );
  }
}
