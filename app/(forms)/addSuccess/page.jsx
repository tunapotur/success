import AddSuccessForm from "./AddSuccessForm";
import requireRedirectPath from "@/lib/requireRedirectPath";

async function AddSuccess() {
  await requireRedirectPath("/addSuccess");

  return <AddSuccessForm />;
}

export default AddSuccess;
