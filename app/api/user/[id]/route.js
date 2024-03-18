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

//TODO aktif session ile değil param.id ile session.user.id eşit mi onu kontrol etmeli
export async function PUT(request, context) {
  const userId = context.params.id;
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

    const { newName, newEmail, newTheme } = await request.json();

    await User.findByIdAndUpdate(userId, {
      name: newName,
      email: newEmail,
      theme: newTheme,
    });

    const updatedUser = await User.findById(userId);
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
