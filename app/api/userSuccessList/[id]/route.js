import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Success from "@/models/Success";

export async function GET(request, context) {
  try {
    await connectMongoDB();

    const data = await Success.find({
      userId: context.params.id,
    });

    const userSuccessList = data.map((success) => ({
      id: success._id,
      date: success.date,
      header: success.header,
      detail: success.detail,
      userId: success.userId,
    }));

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
