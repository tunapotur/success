// TODO: Bu dosya silinecek
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  return NextResponse.json({
    time: new Date().toLocaleString(),
    CurrentUser: "Yeah",
    session: session,
  });
}
