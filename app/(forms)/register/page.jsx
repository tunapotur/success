import RegisterForm from "./RegisterForm";
import requireRedirectPath from "@/lib/requireRedirectPath";

async function Register() {
  await requireRedirectPath("/register");
  return <RegisterForm />;
}

export default Register;
