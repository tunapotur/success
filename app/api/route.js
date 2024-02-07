import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  console.log(session);

  return NextResponse.json({
    time: new Date().toLocaleString(),
    CurrentUser: "Yeah",
  });
}
