"use client";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import { signOut } from "next-auth/react";

function UserProfile() {
  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
      <div>User Profile</div>

      <h1>Theme Selection</h1>
      <ThemeSwitcher />
    </div>
  );
}

export default UserProfile;
