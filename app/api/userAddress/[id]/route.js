import { REGEX_SLUGIFY_EMAIL } from "@/data/constants";
import { currentUser } from "@/lib/currentUser";
import slugify from "slugify";
import { NextResponse } from "next/server";

export async function GET(_, req) {
  const user = await currentUser();

  //* Giriş yapmış kullanıcı varsa işlem yapılıyor
  if (user) {
    const slugifyId = slugify(user?.email, {
      replacement: "_",
      remove: REGEX_SLUGIFY_EMAIL,
    });

    return NextResponse.json({
      time: new Date().toLocaleString(),
      sessionUser: user,
      slugifyId,
    });
  }

  //TODO burada hada döndür ya da fırlat
  return NextResponse.json({
    time: new Date().toLocaleString(),
    userNotLogIn: "User is not logIn!",
  });
}
