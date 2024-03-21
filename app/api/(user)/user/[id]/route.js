import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(request, context) {
  try {
    await connectMongoDB();

    const user = await User.findById(context.params.id);
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

export async function PUT(request, context) {
  const session = await getServerSession(authOptions);
  const context_userId = context.params.id;
  const session_userId = String(session?.user?.id);

  if (session_userId !== context_userId)
    return NextResponse.json(
      {
        message: "Unauthorized user.",
      },
      { status: 401 },
    );

  try {
    await connectMongoDB();

    const { newName, newEmail, newTheme } = await request.json();

    await User.findByIdAndUpdate(context_userId, {
      name: newName,
      email: newEmail,
      theme: newTheme,
    });

    const updatedUser = await User.findById(context_userId);
    updatedUser.password = null;

    return NextResponse.json(
      {
        time: new Date().toLocaleString(),
        message: "User Success updated",
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
