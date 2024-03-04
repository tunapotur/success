import FormPage from "@/components/forms/FormPage";
import AddSuccessForm from "./AddSuccessForm";
import PageControl from "@/components/PageControl";

async function AddSuccess() {
  return (
    <PageControl loading={"Skeleton Loading..."}>
      <FormPage>{<AddSuccessForm />}</FormPage>
    </PageControl>
  );
}

export default AddSuccess;
