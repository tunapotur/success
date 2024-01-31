"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { UserRoundPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

//Form Components
import FormHeader from "../components/FormHeader";
import FormWrapper from "../components/FormWrapper";
import Form from "../components/Form";
import ButtonBack from "../components/ButtonBack";
import { EyeFilledIcon } from "../components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../components/EyeSlashFilledIcon";

function LoginForm() {
  const [email, setEmail] = useState("tunapotur@yahoo.com");
  const [password, setPassword] = useState("tunapotur41");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

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
        {/* Form */}
        <Form handler={handleSubmit}>
          <Input
            label={"e-mail"}
            type={"e-mail"}
            size="lg"
            radius="sm"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <Input
            label={"password"}
            size="lg"
            radius="sm"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                ) : (
                  <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
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

          <ButtonBack />
        </div>
      </FormWrapper>
    </>
  );
}

export default LoginForm;
