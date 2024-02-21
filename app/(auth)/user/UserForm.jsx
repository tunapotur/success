"use client";

import { useSession, signOut } from "next-auth/react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useForm, Controller } from "react-hook-form";
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
import { ToastAction } from "@/components/ui/toast";
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

// TODO lib'e at
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// TODO lib'e at
function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}

const themeSelections = [
  { key: "system", name: "System", icon: <FileSliders /> },
  { key: "light", name: "Light", icon: <Sun /> },
  { key: "dark", name: "Dark", icon: <Moon /> },
];

const NameEmailThemeSchema = z.object({
  name: z.string().min(6, { message: NameIncorrectText }),
  email: z.string().email(EmailIncorrectText).toLowerCase(),
  theme: z.enum(themeSelections.map((item) => item.key)),
});

function UserForm() {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [previousUserInfos, setPreviousUserInfos] = useState({});

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NameEmailThemeSchema),
  });

  // TODO bu açıklamalar düzeltilecek
  // Waiting for Theme and Status(authentication) information
  // useEffect controls form element values when changes
  useEffect(() => {
    async function fetchUser() {
      const response = await fetch("api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { user } = await response.json();

      setPreviousUserInfos({
        name: user.name,
        email: user.email,
        theme: user.theme,
      });
    }
    fetchUser();

    if (status === "authenticated") {
      setValue("name", session?.user.name);
      setValue("email", session?.user.email);
      setTheme(session?.user.theme);
      setMounted(true);
      // TODO kullanıcı bilgilerini veri tabanından al. Session bilgisi sadece kullanıcı logon olunca çalışıyor
      // TODO: veri tabanı kullanıcı bilgileri güncellenidğinde session güncelleniyor mu?

      //TODO session işlemlerini sil
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

  /* TODO Theme Select düzenlenecek
  Theme select seçimi yapılınca devreye girmeyecek
  Theme update olunca devreye girecek(değişim olacak)
   */

  const onSubmitHandler = async ({ name, email, theme }) => {
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

      // Email Exists Check
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

      // No Changes Check
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

      setPreviousUserInfos({
        name: result.updatedUser.name,
        email: result.updatedUser.email,
        theme: result.updatedUser.theme,
      });

      // If new user update successfully
      if (response.ok) {
        toast({
          variant: "destructive",
          className:
            "bg-success-600 text-primary-foreground dark:bg-success-400 border-0",
          description: "User update successful 👍",
          duration: 1000,
        });

        setTheme(theme);
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
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
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
              )}
              name="name"
              control={control}
              defaultValue={session?.user.name}
              className=""
            />
          </InputWrapper>

          {/* Email Input */}
          <InputWrapper isLoading={!mounted}>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
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
              )}
              name="email"
              control={control}
              defaultValue={session?.user.email}
              className=""
            />
          </InputWrapper>

          <InputWrapper isLoading={!mounted}>
            <Controller
              name="theme"
              render={({ field }) => (
                <Select
                  {...field}
                  {...InputGeneralConfig}
                  label="Theme Selection"
                  placeholder="Select a theme"
                  selectionMode="single"
                  items={themeSelections}
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
              )}
              control={control}
              defaultValue={theme}
            />
            {/*             
            <Select
            {...field}
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
            */}
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
