"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Input, Button } from "@nextui-org/react";

function LoginForm() {
  const [email, setEmail] = useState("tunapotur@yahoo.com");
  const [password, setPassword] = useState("tunapotur41");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("Deneme için girilen bir metin bu.");

  const router = useRouter();

  // TODO: tüm kullandığım ikonları lucide ikon setine geçir react icons'u kullanma
  // TODO: bu form'da hatalı kullanıcı girişi yapınca hata veriyor bunu düzelt.
  // TODO: Api'den gelen hataları alacak bir yol bul
  // TODO: Fav icon gitti düzelt.

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
    <>
      <h1 className="mb-[2rem] text-4xl font-bold capitalize tracking-wider text-primary drop-shadow-sm">
        Login
      </h1>

      <div className="flex flex-col gap-y-6 rounded-lg border p-4">
        <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
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

          {/* TODO: Burası hata metni için sabit bir genişlik olarak kalacak. Hata yokken boş hata varken metin olacak. */}
          {error && <div className="text-xl text-danger-500">{error}</div>}
        </form>

        <Button size="lg" radius="sm">
          Register
        </Button>

        <Button size="lg" radius="sm">
          Back
        </Button>
      </div>
    </>
  );
}

export default LoginForm;
