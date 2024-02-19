import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import getServerSessionInfo from "@/lib/getServerSessionInfo";

export async function GET(req) {
  try {
    const session = await getServerSessionInfo();

    if (!session) throw new Error("Unauthorized user. Please login or signup.");

    await connectMongoDB();

    const userId = session?.user.id;

    const user = await User.findById(userId);

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: `An error occurred while updating the user profile. ${error.message}`,
      },
      { status: 500 },
    );
  }
}

export async function PUT(req, _) {
  try {
    const session = await getServerSessionInfo();

    if (!session) throw new Error("Unauthorized user. Please login or signup.");

    await connectMongoDB();

    const userId = session?.user.id;
    const { newName, newEmail, newTheme } = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: newName,
        email: newEmail,
        theme: newTheme,
      },
      //TODO silinebilir dikkat. gereksiz gibi duruyor.
      { new: true },
    );

    return NextResponse.json(
      {
        time: new Date().toLocaleString(),
        message: "Success updated",
        updatedUser,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `An error occurred while updating the user profile. ${error.message}`,
      },
      { status: 500 },
    );
  }
}
