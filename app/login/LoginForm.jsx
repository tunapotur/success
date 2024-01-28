"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Input, Button } from "@nextui-org/react";

function LoginForm() {
  const [email, setEmail] = useState("tunapotur@yahoo.com");
  const [password, setPassword] = useState("tunapotur41");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  // TODO: tüm kullandığım ikonları lucide ikon setine geçir react icons'u kullanma
  // TODO: bu form'da hatalı kullanıcı girişi yapınca hata veriyor bunu düzelt.
  // TODO: Api'den gelen hataları alacak bir yol bul

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
      <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          label="e-mail"
          type="email"
          size="lg"
          radius="sm"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <Input
          label="password"
          type="password"
          size="lg"
          radius="sm"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <Button
          isLoading={isLoading}
          // color="primary"
          type="submit"
          size="lg"
          radius="sm"
          isDisabled={!email || !password}
        >
          {isLoading ? "Please Wait" : "Sign In"}
        </Button>

        {error && <div className="text-danger-500 text-xl">{error}</div>}
      </form>
    </div>
  );
}

export default LoginForm;
