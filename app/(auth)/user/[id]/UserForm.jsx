"use client";

import { useSession, signOut } from "next-auth/react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  AtSign,
  LogOut,
  Save,
  User as UserIcon,
  FileSliders,
  Sun,
  Moon,
} from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import FormHeader from "../../components/FormHeader";
import FormWrapper from "../../components/FormWrapper";
import Form from "../../components/Form";
import {
  EmailIncorrectText,
  NameIncorrectText,
} from "../../components/PasswordRules";
import { InputGeneralConfig } from "../../components/InputGeneralConfig";
import FormAdditionWrapper from "../../components/FormAdditionWrapper";
import ButtonBack from "../../components/ButtonBack";
import InputWrapper from "../../components/InputWrapper";

const NameEmailThemeSchema = z.object({
  name: z.string().min(6, { message: NameIncorrectText }),
  email: z.string().email(EmailIncorrectText).toLowerCase(),
});

function UserForm() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NameEmailThemeSchema),
  });

  // Waiting for Theme and Status(authentication) information
  useEffect(() => {
    if (status === "authenticated") {
      setValue("name", session?.user.name);
      setValue("email", session?.user.email);
      setMounted(true);
    }
  }, [status, setValue, session?.user.name, session?.user.email]);

  const items = [
    { key: "system", name: "System", icon: <FileSliders /> },
    { key: "light", name: "Light", icon: <Sun /> },
    { key: "dark", name: "Dark", icon: <Moon /> },
  ];

  function selectTheme(e) {
    const themeSelection = e.target.value;
    setTheme(themeSelection);
  }

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
          <InputWrapper isLoading={!mounted}>
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
          <InputWrapper isLoading={!mounted}>
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

          <InputWrapper isLoading={!mounted}>
            <Select
              {...InputGeneralConfig}
              label="Theme Selection"
              placeholder="Select a theme"
              onChange={selectTheme}
              selectionMode="single"
              items={items}
              isLoading={isLoading}
              isDisabled={isLoading}
              defaultSelectedKeys={[theme]}
            >
              {(item) => (
                <SelectItem
                  key={item.key}
                  value={item.name}
                  className="capitalize"
                  startContent={item.icon}
                >
                  {item.name}
                </SelectItem>
              )}
            </Select>
          </InputWrapper>

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
