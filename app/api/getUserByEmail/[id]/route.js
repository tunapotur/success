import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request, context) {
  try {
    await connectMongoDB();

    const user = await User.findOne({ email: context.params.id });
    user.password = null;

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: `An error occurred while getting the user profile. ${error.message}`,
      },
      { status: 500 },
    );
  }
}
