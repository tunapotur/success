import { NextResponse, NextRequest } from "next/server";
import { useSession, getSession } from "next-auth/react";
import { getProviders } from "next-auth/react";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  const session = await getSession();
  const providers = await getProviders();

  return NextResponse.json({
    time: new Date().toLocaleString(),
    CurrentUser: "Yeah",
    Session: session,
    Provider: providers,
  });
}
