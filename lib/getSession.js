import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getSession() {
  const session = await getServerSession(authOptions);

  if (!session) throw new Error("Unauthorized user. Please login or signup.");

  return session;
}

export default getSession;
