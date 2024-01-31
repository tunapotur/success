"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { UserRoundPlus } from "lucide-react";
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

// *Regex Test
// https://rubular.com/r/9TIe3qiNoujkxN
// https://uibakery.io/regex-library/password
/*
* Strong password regex
Has minimum 8 characters in length. Adjust it by modifying {8,}
At least one uppercase English letter. You can remove this condition by removing (?=.*?[A-Z])
At least one lowercase English letter.  You can remove this condition by removing (?=.*?[a-z])
At least one digit. You can remove this condition by removing (?=.*?[0-9])
At least one special character,  You can remove this condition by removing (?=.*?[#?!@$%^&*_-])
*/

const FormDataSchema = z.object({
  email: z
    .string()
    .email("hatalı bir mail tipi bu ya")
    .min(6, { message: "en az 30 karakterli bir mail olmalı" }),
  password: z
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$/, {
      message: "Regex Uyumlu Degil!",
    }),
  // .min(6, { message: "en az 6 karakterli bir password olacak" }),
});

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormDataSchema),
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  function onSubmit(data) {
    console.log(data);
  }

  const handleSubmit_eskicalisan = async (e) => {
    e.preventDefault();

    if (!email || !password) return;

    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Login Error",
          description: result?.error,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        setIsLoading(false);
        return;
      }

      toast({
        variant: "destructive",
        className:
          "bg-success-600 text-primary-foreground dark:bg-success-400 border-0",
        description: "Logged in successfully 👍",
        duration: 1000,
      });
      router.refresh();
      router.push("/");
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormHeader header={"Login"} />
      <FormWrapper>
        {/* Form */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email", { required: true })}
            label={"e-mail"}
            type={"e-mail"}
            size="lg"
            radius="sm"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            // isInvalid={true}
            // errorMessage="Please enter a valid email"
          />
          {errors.email?.message && <span>{errors.email?.message}</span>}

          <Input
            {...register("password", { required: true })}
            label={"password"}
            size="lg"
            radius="sm"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                ) : (
                  <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {errors.password?.message && <span>{errors.password?.message}</span>}

          <Button
            isLoading={isLoading}
            type="submit"
            size="lg"
            radius="sm"
            // isDisabled={!email || !password}
            variant="shadow"
            className="bg-primary text-primary-foreground"
          >
            {isLoading ? "Please Wait" : "Sign In"}
          </Button>
        </Form>

        {/* Register and Back buttons */}
        <div className="mt-16 flex flex-col gap-y-6">
          <div className="flex flex-col">
            <div className="mb-2 pl-1 pr-12 italic">
              <p>If you don&apos;t have an account</p>
              <p>please register</p>
            </div>
            <Button
              size="lg"
              radius="sm"
              startContent={<UserRoundPlus />}
              className="bg-success-600 text-primary-foreground dark:bg-success-400"
              onClick={() => router.push("/register")}
            >
              Register
            </Button>
          </div>

          <ButtonBack />
        </div>
      </FormWrapper>
    </>
  );
}

export default LoginForm;
