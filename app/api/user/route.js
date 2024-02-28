import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import getServerSessionInfo from "@/lib/getServerSessionInfo";

export async function GET() {
  const session = await getServerSessionInfo();

  if (!session) return NextResponse.json(
    {
      message: "Unauthorized user. Please login or signup."
    },
    { status: 401 }
  );

  try {
    await connectMongoDB();

    const user = await User.findById(session?.user.id);
    user.password = null;

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: `An error occurred while updating the user profile. ${error.message}`
      },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const session = await getServerSessionInfo();

  if (!session) return NextResponse.json(
    {
      message: "Unauthorized user. Please login or signup."
    },
    { status: 401 }
  );

  try {
    await connectMongoDB();

    const userId = session?.user.id;
    const { newName, newEmail, newTheme } = await req.json();

    await User.findByIdAndUpdate(userId, {
      name: newName,
      email: newEmail,
      theme: newTheme
    });

    const updatedUser = await User.findById(userId);

    return NextResponse.json(
      {
        time: new Date().toLocaleString(),
        message: "Success updated",
        updatedUser
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `An error occurred while updating the user profile. ${error.message}`
      },
      { status: 500 }
    );
  }
}
