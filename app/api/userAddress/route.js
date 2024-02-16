import { NextResponse } from "next/server";
import { currentUser } from "@/lib/currentUser";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import UserProfile from "@/models/UserProfile";

export async function POST(req) {
  try {
    const user = await currentUser();
    const { theme } = await req.json();

    if (user) {
      await connectMongoDB();
      const dbUser = await User.findById(user.id);
      await UserProfile.create({ theme, userId: user?.id });
      return NextResponse.json(
        {
          message: "User profile has been modified.",
          user,
          theme,
          dbUser,
          time: new Date().toLocaleString(),
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        message: `Unauthorized user. Please login or signup.`,
      },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `An error occurred while creating the user profile. ${error.message}`,
      },
      { status: 500 },
    );
  }
}
