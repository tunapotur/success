import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";

import RegisterForm from "./RegisterForm";

async function Register() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return (
    <>
      <RegisterForm />
    </>
  );
}

export default Register;
