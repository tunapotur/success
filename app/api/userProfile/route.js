// TODO: Bu dosya silinecek
import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.json({
    test: "User Profile Test",
    time: new Date().toLocaleString(),
  });
}
