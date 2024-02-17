import { NextResponse } from "next/server";
import { currentUser } from "@/lib/currentUser";
import { connectMongoDB } from "@/lib/mongodb";
import UserAddress from "@/models/UserAddress";

export async function POST(req) {
  try {
    const user = await currentUser();

    if (!user) throw new Error("Unauthorized user. Please login or signup.");

    await connectMongoDB();
    const address = await req.json();

    await UserAddress.create({
      name: address.name,
      description: address.description,
      userId: user.id,
    });

    return NextResponse.json(
      {
        message: "User address has been created.",
        user,
        address,
        time: new Date().toLocaleString(),
      },
      { status: 200 },
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
