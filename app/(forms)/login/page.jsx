import FormPage from "../components/FormPage";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <FormPage isUserToBeLogin={false}>
      <LoginForm />
    </FormPage>
  );
}

export default Login;
