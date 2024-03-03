import FormPage from "@/components/forms/FormPage";
import LoginForm from "./LoginForm";

async function Login() {
  return (
    <FormPage isUserToBeLogin={false}>
      <LoginForm />
    </FormPage>
  );
}

export default Login;
