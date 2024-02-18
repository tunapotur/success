import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import UserAddress from "@/models/UserAddress";
import { getSession } from "next-auth/react";

export async function POST(req) {
  try {
    const user = await getSession()?.user;

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
