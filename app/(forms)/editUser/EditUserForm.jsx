"use client";

import { signOut, useSession } from "next-auth/react";
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
import FormHeader from "@/components/forms/FormHeader";
import FormWrapper from "@/components/forms/FormWrapper";
import Form from "@/components/forms/Form";
import {
  EmailIncorrectText,
  NameIncorrectText,
} from "@/components/forms/FormErrorText";
import { InputGeneralConfig } from "@/components/forms/InputGeneralConfig";
import FormAdditionWrapper from "@/components/forms/FormAdditionWrapper";
import ButtonBack from "@/components/forms/ButtonBack";
import InputWrapper from "@/components/forms/InputWrapper";
import isUserEmailExists from "@/lib/isUserEmailExists";
import objectDiff from "@/lib/objectDiff";

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

// TODO: Kullanıcı veritabanında güncellendiğinde session'da güncellenmiyor olabilir. güncelleme yapılınca signOut yapmak en mantıklısı.
function EditUserForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [previousUserInfos, setPreviousUserInfos] = useState(null);
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NameEmailThemeSchema),
  });
  const { data: session } = useSession();

  // It's get user information and set previous user info
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`api/user/${session?.user?.id}`, {
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
    };

    fetchUser();
  }, [session?.user?.id]);

  //These db values populates inputs for initial
  useEffect(() => {
    if (previousUserInfos) {
      setValue("name", previousUserInfos?.name);
      setValue("email", previousUserInfos?.email);
      setValue("theme", previousUserInfos?.theme);
      // It's for theme usage
      setMounted(true);
    }
  }, [setValue, previousUserInfos]);

  const onSubmitHandler = async ({ name, email, theme }) => {
    try {
      setIsLoading(true);

      const newUserInfos = { name, email, theme };
      const changedUserInfos = objectDiff(previousUserInfos, newUserInfos);

      // No Changes Check
      if (!changedUserInfos) {
        toast({
          variant: "destructive",
          title: "No changes",
          description: `There is no information to update the user!`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        setIsLoading(false);
        return;
      }

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

      // Updating user data
      const response = await fetch("api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changedUserInfos),
      });

      // If new user update successfully
      if (response.ok) {
        const result = await response.json();

        setPreviousUserInfos({
          name: result.updatedUser.name,
          email: result.updatedUser.email,
          theme: result.updatedUser.theme,
        });

        toast({
          variant: "destructive",
          className:
            "bg-success-600 text-primary-foreground dark:bg-success-400 border-0",
          description: "User update successful 👍",
          duration: 1000,
        });

        setTheme(theme);
        setIsLoading(false);

        if (changedUserInfos?.newEmail) await signOut({ callbackUrl: "/" });
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
        description: `User updating failed. ${error}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <>
      <FormHeader header={"Edit User"} />
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
                  /* If the error message doesn't exist,
                  the error message turns undefined.
                  First, not operator(!) makes an undefined value to be true.
                  Second not operator(!) makes true to be false.
                  (!!undefined = false)
                  If an error message exists, this equation is calculated true.
                  (!!"Error message" = true)
                   */
                  isInvalid={!!errors.name?.message}
                  errorMessage={errors.name?.message}
                  placeholder="Please enter your name"
                />
              )}
              name="name"
              control={control}
              /**If input default value gets null, REACT gives us error.
               * So we give empty string("") in first render then input value*/
              defaultValue={previousUserInfos ? previousUserInfos?.name : ""}
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
                />
              )}
              name="email"
              control={control}
              defaultValue={previousUserInfos ? previousUserInfos?.email : ""}
            />
          </InputWrapper>

          {/* Theme Switch */}
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

        <FormAdditionWrapper>
          {/* LogOut button */}
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

          {/* Back button */}
          <ButtonBack isDisabled={isLoading || !mounted} />
        </FormAdditionWrapper>
      </FormWrapper>
    </>
  );
}

export default EditUserForm;
