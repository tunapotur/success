import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";

import LoginForm from "./LoginForm";

async function Login() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return (
    <>
      <LoginForm />
    </>
  );
}

export default Login;
