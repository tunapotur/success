import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Success from "@/models/Success";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(request, context) {
  try {
    await connectMongoDB();

    const success = await Success.findById(context.params.id).populate("user", [
      "_id",
      "name",
      "email",
      "role",
      "theme",
    ]);

    return NextResponse.json({ success }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: `An error occurred while getting the success. ${error.message}`,
      },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  const successId = params.id;
  const session = await getServerSession(authOptions);
  const session_userId = String(session?.user?.id);
  let success = null;

  try {
    await connectMongoDB();

    success = await Success.findById(successId).populate("user", [
      "_id",
      "name",
      "email",
      "role",
      "theme",
    ]);
  } catch (error) {
    success = null;
  }

  const success_userId = String(success?.user._id);
  let returnData;

  if (session_userId === success_userId) {
    try {
      await connectMongoDB();

      const { newDate, newHeader, newDetail } = await request.json();

      await Success.findByIdAndUpdate(successId, {
        date: newDate,
        header: newHeader,
        detail: newDetail,
      });

      const updatedSuccess = await Success.findById(successId);

      returnData = {
        header: "UPDATE is OK. :) ",
        message: "Session and Success user is same.",
        session_userId,
        success_userId,
        updatedSuccess,
      };
    } catch (error) {
      returnData = { header: "Error!", error };
    }
  } else {
    returnData = {
      header: "UPUDATE is not OK! :( ",
      message: "Success user and session user is not same!",
      session_userId,
      success_userId,
    };
  }

  return NextResponse.json({ returnData }, { status: 200 });
}

export async function DELETE(request, { params }) {
  const successId = params.id;
  const session = await getServerSession(authOptions);
  const session_userId = String(session?.user?.id);
  let returnData = null;
  let success = null;

  try {
    await connectMongoDB();
    success = await Success.findById(successId).populate("user", [
      "_id",
      "name",
      "email",
      "role",
      "theme",
    ]);
  } catch (error) {}

  const success_userId = String(success?.user._id);

  if (session_userId === success_userId) {
    try {
      await connectMongoDB();
      await Success.findByIdAndDelete(successId);
    } catch (error) {
      returnData = error;
    }

    returnData = {
      header: "Success is DELETED",
    };
  } else {
    returnData = {
      header: "DELETE is not OK! :( ",
      message: "Success user and session user is not same!",
      session_userId,
      success_userId,
    };
  }

  return NextResponse.json({ returnData }, { status: 200 });
}
