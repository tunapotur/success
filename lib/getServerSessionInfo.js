import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const getServerSessionInfo = async () => await getServerSession(authOptions);

export default getServerSessionInfo;
