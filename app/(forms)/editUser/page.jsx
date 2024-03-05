import EditUserForm from "./EditUserForm";
import requireRedirectPath from "@/lib/requireRedirectPath";

async function EditUser() {
  await requireRedirectPath("/editUser");

  return <EditUserForm />;
}

export default EditUser;
