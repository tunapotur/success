import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Success from "@/models/Success";

export async function GET(request, context) {
  try {
    await connectMongoDB();

    const success = await Success.findById(context.params.id);

    return NextResponse.json({ success }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: `An error occurred while getting the success. ${error.message}`,
      },
      { status: 500 },
    );
  }
}
