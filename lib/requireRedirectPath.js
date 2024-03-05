import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getRoutObjFromRoutIndexList } from "@/data/routIndexList";

async function requireRedirectPath(path = "/") {
  const session = await getServerSession(authOptions);
  const routObj = getRoutObjFromRoutIndexList(path);

  if (routObj?.redirect?.when === "unauthenticated")
    if (!session) redirect(routObj.redirect.link);

  if (routObj?.redirect?.when === "authenticated")
    if (session) redirect(routObj.redirect.link);
}

export default requireRedirectPath;
