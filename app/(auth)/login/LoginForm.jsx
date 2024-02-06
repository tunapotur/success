"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useForm } from "react-hook-form";
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
import ButtonOutsideWrapper from "../components/ButtonOutsideWrapper";
import PasswordRules from "../components/PasswordRules";
import { EmailIncorrectText } from "../components/FormErrorText";

const LoginFormDataSchema = z.object({
  email: z.string().email(EmailIncorrectText),
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
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          <Input
            {...register("email", { required: true })}
            {...InputGeneralConfig}
            isRequired={true}
            label={"E-Mail"}
            type={"e-mail"}
            endContent={
              <AtSign className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
            }
            isInvalid={errors.email?.message ? true : false}
            errorMessage={errors.email?.message}
            placeholder="Please enter your e-mail"
          />

          <Input
            {...register("password", { required: true })}
            {...InputGeneralConfig}
            isRequired={true}
            label={"Password"}
            type={isVisible ? "text" : "password"}
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
            isInvalid={errors.password?.message ? true : false}
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
        <ButtonOutsideWrapper>
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
        </ButtonOutsideWrapper>
      </FormWrapper>
    </>
  );
}

export default LoginForm;
