import User from "@/models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// TODO kullanıcı şifresini de çekecek bir api yapma! Güvenli değil.
// TODO Sadece Admin kullanıcıları kullanıcı bilgilerini çeksin
export async function GET(_, req) {
  const id = req.params.id;
  const user = await User.findById(id);
  const session = await getServerSession(authOptions);

  return NextResponse.json({
    time: new Date().toLocaleString(),
    id,
    user,
    session,
  });
}
