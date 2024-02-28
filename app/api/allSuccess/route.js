import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Success from "@/models/Success";

export async function GET(request, context) {
  try {
    await connectMongoDB();

    const allSuccess = await Success.find({});

    return NextResponse.json({ allSuccess }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: `An error occurred while getting all success list. ${error.message}`,
      },
      { status: 500 },
    );
  }
}
