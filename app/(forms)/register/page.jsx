import FormPage from "../components/FormPage";
import RegisterForm from "./RegisterForm";

function Register() {
  return (
    <FormPage isUserToBeLogin={false}>
      <RegisterForm />
    </FormPage>
  );
}

export default Register;
