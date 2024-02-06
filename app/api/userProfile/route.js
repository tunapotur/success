import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import UserProfile from "@/models/UserProfile";
import { currentUser } from "@/lib/currentUser";
// import User from "@/models/User";

export async function POST(req) {
  try {
    const { theme } = await req.json();

    await connectMongoDB();
    const userId = await currentUser();
    console.log("User ID: ", userId);
    // await UserProfile.create({ theme, userId });

    return NextResponse.json(
      { message: "User profile created." },
      { status: 201 },
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
