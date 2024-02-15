import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// TODO: Eğer sessin varsa USER yoksa ERROR dönüsün(ya da fırlatılsın)
export const currentUser = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};
