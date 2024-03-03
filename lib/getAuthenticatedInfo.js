import getServerSessionInfo from "@/lib/getServerSessionInfo";

const getAuthenticatedInfo = async () => !!(await getServerSessionInfo());

export default getAuthenticatedInfo;
