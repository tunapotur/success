import EditUserForm from "./EditUserForm";
import requireRedirectPath from "@/lib/requireRedirectPath";
import getUserById from "@/lib/getUserById";

export const dynamicParams = true;

async function EditUser({ params }) {
  await requireRedirectPath("/editUser");
  const user = await getUserById(params.id);

  return <EditUserForm user={user} />;
}

export default EditUser;
