import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getRoutObj } from "@/data/routObjList";

async function requireRedirectPath(path = "/") {
  const session = await getServerSession(authOptions);
  const routObj = getRoutObj(path);

  if (routObj?.redirect?.type === "unauthenticated")
    if (!session) redirect(routObj.redirect.link);

  if (routObj?.redirect?.type === "authenticated")
    if (session) redirect(routObj.redirect.link);
}

export default requireRedirectPath;
