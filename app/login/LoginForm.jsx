"use client";

import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginForm() {
  const [email, setEmail] = useState("tunapotur@yahoo.com");
  const [password, setPassword] = useState("tunapotur41");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        setLoading(false);
        return;
      }

      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="main">
      <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>

      <div className="form-container">
        <h2 className="form-header">Login</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your e-mail"
          />

          <input
            className="form-input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
          />

          <div className="flex flex-row justify-between">
            <button
              className="form-button"
              disabled={loading || !email || !password}
            >
              {loading ? "Please wait..." : "Sign In"}
            </button>

            {error && <div className="form-error">{error}</div>}
          </div>
        </form>
      </div>
    </main>
  );
}

export default LoginForm;
