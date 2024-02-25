"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

//Form Components
import FormHeader from "../components/FormHeader";
import { UserRoundPlus } from "lucide-react";
import FormWrapper from "../components/FormWrapper";
import Form from "../components/Form";
import ButtonBack from "../components/ButtonBack";
import { EyeFilledIcon } from "../components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../components/EyeSlashFilledIcon";
import { AtSign } from "lucide-react";
import { InputGeneralConfig } from "../components/InputGeneralConfig";
import FormAdditionWrapper from "../components/FormAdditionWrapper";
import PasswordRules from "../components/PasswordRules";
import { EmailIncorrectText } from "../components/FormErrorText";

const LoginFormDataSchema = z.object({
  email: z.string().email(EmailIncorrectText).toLowerCase(),
  password: z
    .string()
    .regex(PasswordRules.all_without_noWhiteSpace.regex, {
      message: PasswordRules.all_without_noWhiteSpace.text,
    })
    .regex(PasswordRules.noWhiteSpace.regex, {
      message: PasswordRules.noWhiteSpace.text,
    }),
});

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { setTheme } = useTheme();
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(LoginFormDataSchema),
  });

  const onSubmitHandler = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      // SignIn error
      if (signInResult?.error) {
        toast({
          variant: "destructive",
          title: "Login Error",
          description: signInResult?.error,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        setIsLoading(false);
        return;
      }

      // SignIn Result OK operation
      toast({
        variant: "destructive",
        className:
          "bg-success-600 text-primary-foreground dark:bg-success-400 border-0",
        description: "Logged in successfully 👍",
        duration: 1000,
      });

      const response = await fetch("api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { user } = await response.json();

      setTheme(user.theme);

      router.refresh();
      router.push("/");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormHeader header={"Login"} />
      <FormWrapper>
        {/* Form */}
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          <Input
            {...register("email", { required: true })}
            {...InputGeneralConfig}
            isRequired={true}
            label={"E-Mail"}
            type={"e-mail"}
            isDisabled={isLoading}
            endContent={
              <AtSign className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
            }
            isInvalid={!!errors.email?.message}
            errorMessage={errors.email?.message}
            placeholder="Please enter your e-mail"
          />

          <Input
            {...register("password", { required: true })}
            {...InputGeneralConfig}
            isRequired={true}
            label={"Password"}
            type={isVisible ? "text" : "password"}
            isDisabled={isLoading}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="pointer-events-none h-7 w-7 flex-shrink-0 text-2xl text-default-400" />
                ) : (
                  <EyeFilledIcon className="pointer-events-none h-7 w-7 flex-shrink-0 text-2xl text-default-400" />
                )}
              </button>
            }
            isInvalid={!!errors.password?.message}
            errorMessage={errors.password?.message}
            placeholder="Please enter your password"
          />

          {/* SignIn Button */}
          <Button
            isLoading={isLoading}
            type="submit"
            size="lg"
            radius="sm"
            variant="shadow"
            className="bg-primary text-primary-foreground"
          >
            {isLoading ? "Please Wait" : "Sign In"}
          </Button>
        </Form>

        {/* Register and Back buttons */}
        <FormAdditionWrapper>
          <div className="flex flex-col">
            <div className="mb-2 pl-1 pr-12 italic">
              <p>If you don&apos;t have an account</p>
              <p>please register</p>
            </div>
            <Button
              size="lg"
              radius="sm"
              startContent={<UserRoundPlus />}
              isDisabled={isLoading}
              className="bg-success-600 text-primary-foreground dark:bg-success-400"
              onClick={() => router.push("/register")}
            >
              Register
            </Button>
          </div>
          <ButtonBack isDisabled={isLoading} />
        </FormAdditionWrapper>
      </FormWrapper>
    </>
  );
}

export default LoginForm;
