"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Input, Button } from "@nextui-org/react";

function LoginForm() {
  const [email, setEmail] = useState("tunapotur@yahoo.com");
  const [password, setPassword] = useState("tunapotur41");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("Hata için deneme metni giriyorum.");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        setIsLoading(false);
        return;
      }

      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <h1 className="">Login</h1>
      <form
        className="flex w-full flex-wrap gap-4 md:flex-nowrap"
        onSubmit={handleSubmit}
      >
        <Input
          label="e-mail"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <Input
          label="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <Button
          isLoading={isLoading}
          color="primary"
          type="submit"
          isDisabled={!email || !password}
        >
          {isLoading ? "" : "Sign In"}
        </Button>

        {error && <div className="">{error}</div>}
      </form>
    </div>
  );
}

export default LoginForm;
