"use client";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import { signOut } from "next-auth/react";
import { useSession, getSession } from "next-auth/react";

function UserProfile() {
  const { data: session, status } = useSession();

  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
      <div>User Profile</div>

      <h1>Theme Selection</h1>
      <ThemeSwitcher />

      <div>{status}</div>
      <div>{session?.user?._id}</div>
    </div>
  );
}

export default UserProfile;
