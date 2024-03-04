import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// TODO bu işlemi düzelt
async function FormPage({ children, isUserToBeLogin = true }) {
  /*  const session = await getServerSession(authOptions);

  if (!session && isUserToBeLogin) redirect("/");*/

  return <>{children}</>;
}

export default FormPage;
