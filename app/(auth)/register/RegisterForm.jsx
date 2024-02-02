"use client";

import { useState } from "react";
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
import FormWrapper from "../components/FormWrapper";
import Form from "../components/Form";
import ButtonBack from "../components/ButtonBack";
import { EyeFilledIcon } from "../components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../components/EyeSlashFilledIcon";
import { AtSign } from "lucide-react";
import { User } from "lucide-react";

import { InputGeneralConfig } from "../components/InputGeneralConfig";
import ButtonOutsideWrapper from "../components/ButtonOutsideWrapper";

import { RegexValidationList } from "../components/PasswordRegex";
import PasswordRoulesChecker from "../components/PasswordRoulesChecker";

const { minLength, maxLength, digit, lowercase, uppercase, special } =
  RegexValidationList;

const RegisterFormDataSchema = z.object({
  name: z.string().min(6, { message: "The name must be at least 8 character" }),
  email: z
    .string()
    .email(
      "The e-mail address is incorrect. Please correct your e-mail address and enter it again.",
    ),
  password: z
    .string()
    .regex(minLength, {
      message: "Password must have at least a minimum 8 characters in length",
    })
    .regex(maxLength, {
      message: "Password must have at least a maximum 16 characters in length",
    })
    .regex(digit, {
      message: "Password must have at least one digit. [0-9]",
    })
    .regex(lowercase, {
      message:
        "Password must have at least one uppercase English letter. [a-z]",
    })
    .regex(uppercase, {
      message:
        "Password must have at least one lowercase English letter. [A-Z]",
    })
    .regex(special, {
      message:
        "Password must have at least one special character. [#?!@$%^&*_-]",
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
            placeholder="Please enter your name"
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
            placeholder="Please enter your e-mail"
          />

          {/* Password Input */}
          <div>
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
              placeholder="Please enter your password"
            />
            {/* Password Rules */}
            <PasswordRoulesChecker password={watch("password")} />
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
        <ButtonOutsideWrapper>
          <ButtonBack />
        </ButtonOutsideWrapper>
      </FormWrapper>
    </>
  );
}

export default RegisterForm;
