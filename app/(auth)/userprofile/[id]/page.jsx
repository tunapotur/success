"use client";

import ThemeSwitcher from "../ThemeSwitcher";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Input, Button } from "@nextui-org/react";
import FormHeader from "../../components/FormHeader";
import FormWrapper from "../../components/FormWrapper";
import { useState } from "react";
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

const NameEmailSchema = z.object({
  name: z.string().min(6, { message: NameIncorrectText }),
  email: z.string().email(EmailIncorrectText).toLowerCase(),
});

function UserProfile() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [userThemeSelection, setUserThemeSelection] = useState("");
  const { toast } = useToast();

  // TODO Varsayalın değerler silinecek. Name ve Email value değerleri düzeltilecek
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "Tuna Potur", email: "tunapotur@yahoo.com" },
    resolver: zodResolver(NameEmailSchema),
  });

  const onSubmitHandler = async ({ name, email }) => {
    console.log("User Theme Selection:", userThemeSelection);
  };

  return (
    <>
      <FormHeader header={"User Profile"} />
      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          {/* Name Input */}
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
            value="Tuna Potur"
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
            value="tunapotur@yahoo.com"
          />

          <ThemeSwitcher setUserThemeSelection={setUserThemeSelection} />

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

export default UserProfile;

/*
  <h1>User Session Infos</h1>
  <div>{status}</div>
  <div>{session?.user?.id}</div>
  <div>{session?.user?.name}</div>
  <div>{session?.user?.email}</div>
  <div>{session?.user?.role}</div>
*/
