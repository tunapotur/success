import FormPage from "@/components/forms/FormPage";
import AddSuccessForm from "./AddSuccessForm";
import PageControl from "@/components/PageControl";

function AddSuccess() {
  return (
    <PageControl>
      <FormPage>{<AddSuccessForm />}</FormPage>
    </PageControl>
  );
}

export default AddSuccess;
