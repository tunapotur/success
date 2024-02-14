import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import UserProfileForm from "../UserProfileForm";

async function UserProfile() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return (
    <>
      <UserProfileForm />
    </>
  );
}

export default UserProfile;
