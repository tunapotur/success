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

export async function PUT(request, context) {
  const successId = context.params.id;
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
}

/** Cray Session Token
 eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..sP2ZndYtFcd5PIvP.aSoHnMhK4D5qUKYL2cMGZlLduembV0xO5oe7euZTtUYpGn5J4XPPJ2gSKhl8m--KuZWB3Oj3expjbyTX_7JPuDum5iwAHzTUeQFOgQfokcmrlkrw86CWn1nn8NjjlK9p_LACpXc9lhdfQ9h76WjajPgFcDq3CzkmKHdBEHjj5XMt5GQN7bQYXIH5b5gJHrcwPz6gDg0AuWPQ8gHcP4YuOwm8D43Os2kRjFPOm9x4giTRrVfzivA9km8pEYAFB4W41WmP7BDC952YV6v8sVTvrm0PBgzUywGvUK3RCaUVszAOABGFBnzaWvp674UgP3Ve4O6aMRvgiuqnmFN05tacz2srhliSvbLhMPq7TaYm3cnT7ApOHRe5KCUF5sjjK8GlPg.W4rAImGsk247HCfKSoD20g
 * */

/** Tuna Session Token
 eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..O5zRZF5ey4fj1O-u.PAW_drYMk3dpUZ44mqzIWebxI2S47Eivdjpl3uK5M_qMM22CbACT9SDOpmNsCUDgEijh8xUEtm-gKQI4-qaSFHEdMoXVlIBwO5sDQ3rj03mofxQykT4DAF8NasSujt9X8qQkz7-xsmz4xJLUw3kvb95HFLB8JAjArhPb3Q6KXattBTZIhaCyOYCbBLnGRSFSE74uTx43ZPbh_NwzhaLQwm5qAqbJVn8YpgcUHlDDsU16fLIwrdb3yO3b8DuuNqC2BDNhyOW5_4lYjv2aDJfD2epKXVUUEOge50VpvwnrafqwFooEJiBZKezqgMLd-zZvgjXOBKFKU_C0yyVsPDh4sLLg3i1wl58AuumC2gVnmwyDvsSXvi8BBitybx5Hwl3WIVkshUj4cAzsAg.Ql_3hdETjfwDF7PSScJfNA
 * */
