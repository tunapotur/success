import { redirect } from "next/navigation";
import UserForm from "./UserForm";
import getServerSessionInfo from "@/lib/getServerSessionInfo";

async function User() {
  const session = await getServerSessionInfo();

  if (!session) redirect("/");

  return (
    <>
      <UserForm />
    </>
  );
}

export default User;
