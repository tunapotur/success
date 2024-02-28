import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Success from "@/models/Success";

export async function GET(request, context) {
  try {
    await connectMongoDB();

    const userAllSuccess = await Success.find({ userId: context.params.id });

    return NextResponse.json({ userAllSuccess }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: `An error occurred while getting user all success list. ${error.message}`,
      },
      { status: 500 },
    );
  }
}
