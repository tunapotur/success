import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getSessionUserInfo() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session) throw new Error("Unauthorized user. Please login or signup.");

  return user;
}

export default getSessionUserInfo;
