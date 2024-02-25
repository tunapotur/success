import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function FormPage({ children, isUserToBeLogin = true }) {
  const session = await getServerSession(authOptions);

  if (!session && isUserToBeLogin) redirect("/");

  return <>{children}</>;
}

export default FormPage;
