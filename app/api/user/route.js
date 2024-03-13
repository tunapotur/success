import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function PUT(req, res) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json(
      {
        message: "Unauthorized user. Please login or signup.",
      },
      { status: 401 },
    );

  try {
    await connectMongoDB();

    const userId = session?.user.id;
    const { newName, newEmail, newTheme } = await req.json();

    await User.findByIdAndUpdate(userId, {
      name: newName,
      email: newEmail,
      theme: newTheme,
    });

    const updatedUser = await User.findById(userId);

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
