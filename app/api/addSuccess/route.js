import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Success from "@/models/Success";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, res) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) throw new Error("Unauthorized user. Please login or signup.");

    const user = session?.user;

    await connectMongoDB();
    const success = await req.json();
    const { date, header, detail } = success;

    await Success.create({
      date,
      header,
      detail,
      userId: user.id,
    });

    return NextResponse.json(
      {
        time: new Date().toLocaleString(),
        message: "Success has been created.",
        success,
        user,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `An error occurred while creating the success. ${error.message}`,
      },
      { status: 500 },
    );
  }
}
