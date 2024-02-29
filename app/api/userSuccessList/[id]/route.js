import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Success from "@/models/Success";
import mapSuccessData from "@/lib/mapSuccessData";

export async function GET(request, context) {
  try {
    await connectMongoDB();

    const data = await Success.find({
      userId: context.params.id,
    });

    const userSuccessList = mapSuccessData(data);

    return NextResponse.json({ userSuccessList }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: `An error occurred while getting user all success list. ${error.message}`,
      },
      { status: 500 },
    );
  }
}
