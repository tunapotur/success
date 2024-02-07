import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export const currentUser = async () => {
  const session = await getServerSession(authOptions);
  return session.user;
};
