import getServerSessionInfo from "@/lib/getServerSessionInfo";
import { redirect } from "next/navigation";

// TODO bu işlemi düzelt
async function FormPage({ children, isUserToBeLogin = true }) {
  /*  const session = await getServerSessionInfo();

  if (!session && isUserToBeLogin) redirect("/");*/

  return <>{children}</>;
}

export default FormPage;
