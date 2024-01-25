import LoginForm from "./LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";

async function Login() {
  const session = await getServerSession(authOptions);

  // if (session) redirect("/");

  return (
    <main>
      <LoginForm />
    </main>
  );
}

export default Login;
