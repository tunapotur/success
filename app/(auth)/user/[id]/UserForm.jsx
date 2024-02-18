"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Input, Button } from "@nextui-org/react";
import FormHeader from "../../components/FormHeader";
import FormWrapper from "../../components/FormWrapper";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../components/Form";
import * as z from "zod";
import {
  EmailIncorrectText,
  NameIncorrectText,
} from "../../components/PasswordRules";

import { InputGeneralConfig } from "../../components/InputGeneralConfig";

import { AtSign, LogOut, Save, User as UserIcon } from "lucide-react";

import FormAdditionWrapper from "../../components/FormAdditionWrapper";
import ButtonBack from "../../components/ButtonBack";
import ThemeSwitch from "../../components/ThemeSwitch";
import InputSkeleton from "../../components/InputSkeleton";

const NameEmailSchema = z.object({
  name: z.string().min(6, { message: NameIncorrectText }),
  email: z.string().email(EmailIncorrectText).toLowerCase(),
});

function UserForm() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const user = session?.user;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NameEmailSchema),
  });

  // Theme bilgilerinin localstorage'den alınması bekleniyor
  useEffect(() => {
    setMounted(true);
    setIsReady(() => status === "authenticated" && mounted === true);
  }, [status, mounted]);

  useEffect(() => {
    if (status === "authenticated") {
      setValue("name", session?.user.name);
      setValue("email", session?.user.email);
    }
  }, [status, setValue, session?.user.name, session?.user.email]);

  const onSubmitHandler = async ({ name, email }) => {
    console.log("Name: ", name);
    console.log("Email: ", email);
    console.log("Theme: ", theme);
  };

  return (
    <>
      <FormHeader header={"User"} />
      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          {/* Name Input */}
          <InputWrapper isLoading={!isReady}>
            <Input
              {...register("name")}
              {...InputGeneralConfig}
              label={"Name"}
              type={"text"}
              endContent={
                <UserIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
              }
              isInvalid={errors.name?.message ? true : false}
              errorMessage={errors.name?.message}
              placeholder="Please enter your name"
              defaultValue={session?.user.name}
            />
          </InputWrapper>

          {/* Email Input */}
          <InputWrapper isLoading={!isReady}>
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
              defaultValue={session?.user.email}
            />
          </InputWrapper>

          {/* ThemeSwitch */}
          <ThemeSwitch isLoading={!isReady} theme={theme} setTheme={setTheme} />

          {/* Save Button */}
          <Button
            isLoading={isLoading}
            type="submit"
            size="lg"
            radius="sm"
            variant="shadow"
            className="bg-primary text-primary-foreground"
            startContent={<Save />}
          >
            {isLoading ? "Please Wait" : "Save"}
          </Button>
        </Form>

        {/* Back button */}
        <FormAdditionWrapper>
          <Button
            size="lg"
            radius="sm"
            startContent={<LogOut />}
            className="bg-danger-600 text-primary-foreground dark:bg-danger-300"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </Button>

          <ButtonBack />
        </FormAdditionWrapper>
      </FormWrapper>
    </>
  );
}

export default UserForm;

function InputWrapper({ isLoading, children }) {
  return (
    <div className="flex h-[5rem] flex-col justify-center gap-y-[0.5rem]">
      {isLoading ? <InputSkeleton /> : children}
    </div>
  );
}
