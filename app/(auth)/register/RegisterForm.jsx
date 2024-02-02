"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
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
import { User } from "lucide-react";

import { InputGeneralConfig } from "../components/InputGeneralConfig";
import ButtonButtonsWrapper from "../components/ButtomButtonsWrapper";
import { PasswordRegex } from "../components/PasswordRegex";

const RegisterFormDataSchema = z.object({
  name: z.string().min(6, { message: "The name must be at least 8 character" }),
  email: z
    .string()
    .email(
      "The e-mail address is incorrect. Please correct your e-mail address and enter it again.",
    ),
  password: z.string().regex(PasswordRegex, {
    message:
      "This password doesn't follow the rules. Please correct your password and enter it again.",
  }),
});

// *Regex Test
// https://rubular.com/r/9TIe3qiNoujkxN
// https://uibakery.io/regex-library/password
/*
* Strong password regex rules
* 
Password must have at least
a minimum 8 characters in length
one uppercase English letter [A-Z]
one lowercase English letter [a-z]
one digit [0-9]
one special character [#?!@$%^&*_-]
*/

function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", email: "", password: "" },
    resolver: zodResolver(RegisterFormDataSchema),
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmitHandler = async ({ name, email, password }) => {
    console.log(name, email, password);
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
            label={"Name"}
            type={"text"}
            endContent={
              <User className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
            }
            isInvalid={errors.name?.message ? true : false}
            errorMessage={errors.name?.message}
          />

          {/* Email Input */}
          <Input
            {...register("email")}
            {...InputGeneralConfig}
            label={"E-Mail"}
            type={"e-mail"}
            endContent={
              <AtSign className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
            }
            isInvalid={errors.email?.message ? true : false}
            errorMessage={errors.email?.message}
          />

          {/* Password Input */}
          <Input
            {...register("password", { required: true })}
            {...InputGeneralConfig}
            label={"Password"}
            type={isVisible ? "text" : "password"}
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
            isInvalid={errors.password?.message ? true : false}
            errorMessage={errors.password?.message}
          />

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
        <ButtonButtonsWrapper>
          <ButtonBack />
        </ButtonButtonsWrapper>
      </FormWrapper>
    </>
  );
}

export default RegisterForm;
