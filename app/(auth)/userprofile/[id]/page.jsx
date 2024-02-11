"use client";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Input, Button } from "@nextui-org/react";
import FormHeader from "../../components/FormHeader";
import FormWrapper from "../../components/FormWrapper";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { RegisterFormDataSchema } from "../../register/RegisterForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../components/Form";

import { InputGeneralConfig } from "../../components/InputGeneralConfig";

import {
  AtSign,
  LogOut,
  Save,
  FileSliders,
  Sun,
  Moon,
  User as UserIcon,
} from "lucide-react";

import FormAdditionWrapper from "../../components/FormAdditionWrapper";
import ButtonBack from "../../components/ButtonBack";

function UserProfile() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", email: "", password: "" },
    resolver: zodResolver(RegisterFormDataSchema),
  });

  const onSubmitHandler = async ({ name, email, password }) => {};

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
          />

          {/* Email Input */}
          <Input
            {...register("email")}
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

          <ThemeSwitcher />

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
          <h1>User Session Infos</h1>
          <div>{status}</div>
          <div>{session?.user?._id}</div>
          <div>{session?.user?.name}</div>
          <div>{session?.user?.email}</div>
        </FormAdditionWrapper>
      </FormWrapper>
    </>
  );
}

export default UserProfile;
