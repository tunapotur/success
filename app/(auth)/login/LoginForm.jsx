"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@nextui-org/react";
import { UserRoundPlus, MoveLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import FormHeader from "../components/FormHeader";
import FormWrapper from "../components/FormWrapper";
import Form from "../components/Form";
import FormInput from "../components/FormInput";

function LoginForm() {
  const [email, setEmail] = useState("tunapotur@yahoo.com");
  const [password, setPassword] = useState("tunapotur41");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return;

    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Login Error",
          description: result?.error,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        setIsLoading(false);
        return;
      }

      toast({
        variant: "destructive",
        className:
          "bg-success-600 text-primary-foreground dark:bg-success-400 border-0",
        description: "Logged in successfully 👍",
        duration: 1000,
      });
      router.refresh();
      router.push("/");
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormHeader header={"Login"} />

      <FormWrapper>
        <>
          {/* Form */}
          <Form handler={handleSubmit}>
            <>
              <FormInput
                label={"e-mail"}
                type={"email"}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

              <FormInput
                label={"password"}
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <Button
                isLoading={isLoading}
                type="submit"
                size="lg"
                radius="sm"
                isDisabled={!email || !password}
                variant="shadow"
                className="bg-primary text-primary-foreground"
              >
                {isLoading ? "Please Wait" : "Sign In"}
              </Button>
            </>
          </Form>

          {/* Register and Back buttons */}
          <div className="mt-16 flex flex-col gap-y-6">
            <div className="flex flex-col">
              <div className="mb-2 pl-1 pr-12 italic">
                <p>If you don&apos;t have an account</p>
                <p>please register</p>
              </div>
              <Button
                size="lg"
                radius="sm"
                startContent={<UserRoundPlus />}
                className="bg-success-600 text-primary-foreground dark:bg-success-400"
                onClick={() => router.push("/register")}
              >
                Register
              </Button>
            </div>

            <Button
              size="lg"
              radius="sm"
              variant="bordered"
              startContent={<MoveLeft />}
              onClick={() => router.back()}
            >
              Back
            </Button>
          </div>
        </>
      </FormWrapper>
    </>
  );
}

export default LoginForm;
