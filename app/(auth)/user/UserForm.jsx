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
  User as UserIcon,
  FileSliders,
  Sun,
  Moon,
} from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import FormHeader from "../components/FormHeader";
import FormWrapper from "../components/FormWrapper";
import Form from "../components/Form";
import {
  EmailIncorrectText,
  NameIncorrectText,
} from "../components/FormErrorText";
import { InputGeneralConfig } from "../components/InputGeneralConfig";
import FormAdditionWrapper from "../components/FormAdditionWrapper";
import ButtonBack from "../components/ButtonBack";
import InputWrapper from "../components/InputWrapper";
import isUserEmailExists from "@/lib/isUserEmailExists";
import { ToastAction } from "@radix-ui/react-toast";

// TODO lib'e at
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}

function UserForm() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [previousUserInfos, setPreviousUserInfos] = useState({});

  const NameEmailThemeSchema = z.object({
    name: z.string().min(6, { message: NameIncorrectText }),
    email: z.string().email(EmailIncorrectText).toLowerCase(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NameEmailThemeSchema),
  });

  // Waiting for Theme and Status(authentication) information
  // useEffect controls form element values when changes
  useEffect(() => {
    if (status === "authenticated") {
      setValue("name", session?.user.name);
      setValue("email", session?.user.email);
      setTheme(session?.user.theme);
      setMounted(true);
      setPreviousUserInfos({
        name: session?.user.name,
        email: session?.user.email,
        theme: session?.user.theme,
      });
    }
  }, [
    status,
    setValue,
    setTheme,
    session?.user.name,
    session?.user.email,
    session?.user.theme,
    setPreviousUserInfos,
  ]);

  const items = [
    { key: "system", name: "System", icon: <FileSliders /> },
    { key: "light", name: "Light", icon: <Sun /> },
    { key: "dark", name: "Dark", icon: <Moon /> },
  ];

  const onSubmitHandler = async ({ name, email }) => {
    try {
      setIsLoading(true);

      const newUserInfos = { name, email, theme };
      const changedUserInfos = {};
      Object.keys(previousUserInfos)
        .filter((key) => previousUserInfos[key] !== newUserInfos[key])
        .map(
          (key) =>
            (changedUserInfos["new".concat(capitalizeFirstLetter(key))] =
              newUserInfos[key]),
        );

      console.log("Previous User Infos: ", previousUserInfos);
      console.log("New User Infos: ", newUserInfos);
      console.log("Email: ", changedUserInfos?.email);
      console.log("Changed Object: ", changedUserInfos);

      if (changedUserInfos?.newEmail)
        if (await isUserEmailExists(email)) {
          toast({
            variant: "destructive",
            title: "User already exists.",
            description: `There is an account on ${email}`,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          setIsLoading(false);
          return;
        }

      if (isEmpty(changedUserInfos)) {
        toast({
          variant: "destructive",
          title: "No changes",
          description: `There is no information to update the user!`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        setIsLoading(false);
        return;
      }

      // Updating user datas
      const response = await fetch("api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changedUserInfos),
      });

      const result = await response.json();
      console.log(result);

      // If new user update successfully
      if (response.ok) {
        toast({
          variant: "destructive",
          className:
            "bg-success-600 text-primary-foreground dark:bg-success-400 border-0",
          description: "User update successful 👍",
          duration: 1000,
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "User Update Error",
          description: "User updating failed",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "User Update Error",
        description: `User updating failed${error}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
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
              isDisabled={isLoading || !mounted}
              endContent={
                <UserIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
              }
              /* eğer mesaj varsa
              önce mesajın değeri dönecek,
              ilk ünlem mesaja önce boolen false yapacak
              ikinci ünlem false'u true yapacak*/
              isInvalid={!!errors.name?.message}
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
              isDisabled={isLoading || !mounted}
              endContent={
                <AtSign className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
              }
              isInvalid={!!errors.email?.message}
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
              onChange={(e) => setTheme(e.target.value)}
              selectionMode="single"
              items={items}
              isLoading={isLoading || !mounted}
              isDisabled={isLoading || !mounted}
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
            isLoading={isLoading || !mounted}
            type="submit"
            size="lg"
            radius="sm"
            variant="shadow"
            className="bg-primary text-primary-foreground"
          >
            {isLoading ? "Please Wait" : "Update"}
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
            isDisabled={isLoading || !mounted}
          >
            Logout
          </Button>

          <ButtonBack isDisabled={isLoading || !mounted} />
        </FormAdditionWrapper>
      </FormWrapper>
    </>
  );
}

export default UserForm;
