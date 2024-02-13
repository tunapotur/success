// TODO: Bu dosya silinecek
import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.json({
    time: new Date().toLocaleString(),
    test: "api Test",
  });
}
