"use client";

import DarkLightThemeButton from "@/components/DarkLightThemeButton";
import { signOut } from "next-auth/react";

function UserProfile() {
  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
      <div>User Profile</div>
      <DarkLightThemeButton />
    </div>
  );
}

export default UserProfile;
