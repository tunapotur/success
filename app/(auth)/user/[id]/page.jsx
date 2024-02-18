import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import UserForm from "./UserForm";

async function User() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return (
    <>
      <UserForm />
    </>
  );
}

export default User;
