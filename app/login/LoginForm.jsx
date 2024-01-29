"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Input, Button } from "@nextui-org/react";

import { UserRoundPlus, MoveLeft } from "lucide-react";

function LoginForm() {
  const [email, setEmail] = useState("tunapotur@yahoo.com");
  const [password, setPassword] = useState("tunapotur41");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  // TODO: bu form'da hatalı kullanıcı girişi yapınca hata veriyor bunu düzelt.
  // TODO: Api'den gelen hataları alacak bir yol bul

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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

      if (!res.error) {
        router.refresh();
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="mb-[2rem] text-4xl font-bold capitalize tracking-wider text-primary drop-shadow-sm">
        Login
      </h1>

      <div className="flex flex-col rounded-lg border p-4">
        {/* Form */}
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
            type="submit"
            size="lg"
            radius="sm"
            isDisabled={!email || !password}
            variant="shadow"
            className="bg-primary text-primary-foreground"
          >
            {isLoading ? "Please Wait" : "Sign In"}
          </Button>
        </form>

        {/* Error message */}
        <div className="mt-2 flex h-10 flex-col justify-center pl-1 text-lg text-destructive">
          {error && <>{error}</>}
        </div>

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
            >
              Register
            </Button>
          </div>

          <Button
            size="lg"
            radius="sm"
            variant="bordered"
            startContent={<MoveLeft />}
          >
            Back
          </Button>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
