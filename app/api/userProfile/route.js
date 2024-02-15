import { REGEX_SLUGIFY_EMAIL } from "@/data/constants";
import { currentUser } from "@/lib/currentUser";
import slugify from "slugify";
import { NextResponse } from "next/server";
import UserProfile from "@/models/UserProfile";

export async function GET(_, req) {
  const user = await currentUser();

  //* Giriş yapmış kullanıcı varsa işlem yapılıyor
  if (user) {
    const slugifyId = slugify(user?.email, {
      replacement: "_",
      remove: REGEX_SLUGIFY_EMAIL,
    });

    const userProfileValues = await UserProfile.find({ userId: user.id });

    return NextResponse.json({
      time: new Date().toLocaleString(),
      sessionUser: user,
      slugifyId,
      userProfileValue: userProfileValues,
    });
  }

  //TODO burada hada döndür ya da fırlat
  return NextResponse.json({
    time: new Date().toLocaleString(),
    userNotLogIn: "User is not logIn!",
  });
}

export async function PUT(request, { params }) {
  const user = await currentUser();

  //* Giriş yapmış kullanıcı varsa işlem yapılıyor
  if (user) {
    // const userProfile = await UserProfile.findById(user.id);
    return NextResponse.json({
      sessionUser: user,
      userProfile,
    });
  }

  //TODO session yoksa hata döndür
}
