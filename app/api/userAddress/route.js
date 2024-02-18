import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import UserAddress from "@/models/UserAddress";
import getSessionUserInfo from "@/lib/getSessionUserInfo";

export async function POST(req) {
  try {
    const user = await getSessionUserInfo();

    await connectMongoDB();
    const address = await req.json();

    await UserAddress.create({
      name: address.name,
      description: address.description,
      userId: user.id,
    });

    return NextResponse.json(
      {
        time: new Date().toLocaleString(),
        message: "User address has been created.",
        user,
        address,
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
