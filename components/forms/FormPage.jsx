import getServerSessionInfo from "@/lib/getServerSessionInfo";
import { redirect } from "next/navigation";

async function FormPage({ children, isUserToBeLogin = true }) {
  const session = await getServerSessionInfo();

  if (!session && isUserToBeLogin) redirect("/");

  return <>{children}</>;
}

export default FormPage;
