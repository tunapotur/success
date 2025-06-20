"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@heroui/react";
import { Input } from "@heroui/react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

//Form Components
import FormHeader from "@/components/forms/FormHeader";
import FormWrapper from "@/components/forms/FormWrapper";
import Form from "@/components/forms/Form";
import ButtonBack from "@/components/forms/ButtonBack";
import { EyeFilledIcon } from "@/components/forms/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/forms/EyeSlashFilledIcon";
import { AtSign } from "lucide-react";
import { User } from "lucide-react";
import { InputGeneralConfig } from "@/components/forms/InputGeneralConfig";
import FormAdditionWrapper from "@/components/forms/FormAdditionWrapper";

import PasswordRulesChecker from "@/components/forms/PasswordRulesChecker";
import PasswordRules from "@/components/forms/PasswordRules";
import {
  EmailIncorrectText,
  NameIncorrectText,
} from "@/components/forms/FormErrorText";

import isUserEmailExists from "@/lib/isUserEmailExists";

const { between, digit, lowercase, uppercase, special, noWhiteSpace } =
  PasswordRules;

export const RegisterFormDataSchema = z.object({
  name: z.string().min(6, { message: NameIncorrectText }),
  email: z.string().email(EmailIncorrectText).toLowerCase(),
  password: z
    .string()
    .regex(between.regex, {
      message: between.text,
    })
    .regex(digit.regex, {
      message: digit.text,
    })
    .regex(lowercase.regex, {
      message: lowercase.text,
    })
    .regex(uppercase.regex, {
      message: uppercase.text,
    })
    .regex(special.regex, {
      message: special.text,
    })
    .regex(noWhiteSpace.regex, {
      message: noWhiteSpace.text,
    }),
});

function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", email: "", password: "" },
    resolver: zodResolver(RegisterFormDataSchema),
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmitHandler = async ({ name, email, password }) => {
    try {
      setIsLoading(true);

      if (await isUserEmailExists(email)) {
        toast({
          variant: "destructive",
          title: "User already exists.",
          description: `There is an account on ${email}.`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        setIsLoading(false);
        return;
      }

      // Creating new user
      const response = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      // If new user created successfully. Sign in new user.
      if (response.ok) {
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        toast({
          variant: "destructive",
          className:
            "bg-success-600 text-primary-foreground dark:bg-success-400 border-0",
          description: "Registration successful 👍",
          duration: 1000,
        });
        setIsLoading(false);
        router.push("/");
        router.refresh();
      } else {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Registration Error",
          description: "User registration failed",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Registration Error",
        description: `User registration failed. ${error}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <>
      <FormHeader header={"Register"} />
      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          {/* Name Input */}
          <Input
            {...register("name")}
            {...InputGeneralConfig}
            isRequired={true}
            label={"Name"}
            type={"text"}
            isDisabled={isLoading}
            endContent={
              <User className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
            }
            isInvalid={!!errors.name?.message}
            errorMessage={errors.name?.message}
            placeholder="Please enter your name"
          />

          {/* Email Input */}
          <Input
            {...register("email")}
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

          {/* Password Input */}
          <div>
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
                  onClick={toggleVisibility}
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
            {/* Password Rules */}
            <PasswordRulesChecker password={watch("password")} />
          </div>

          {/* Sign Up Button */}
          <Button
            isLoading={isLoading}
            type="submit"
            size="lg"
            radius="sm"
            variant="shadow"
            className="bg-primary text-primary-foreground"
          >
            {isLoading ? "Please Wait" : "Sign Up"}
          </Button>
        </Form>

        {/* Back button */}
        <FormAdditionWrapper>
          <ButtonBack isDisabled={isLoading} />
        </FormAdditionWrapper>
      </FormWrapper>
    </>
  );
}

export default RegisterForm;
