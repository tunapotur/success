import LoginForm from "./LoginForm";
import requireRedirectPath from "@/lib/requireRedirectPath";

async function Login() {
  await requireRedirectPath("/login");
  return <LoginForm />;
}

export default Login;
