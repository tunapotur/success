"use client";

import { signOut } from "next-auth/react";

function UserProfile() {
  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
      <div>User Profile</div>
    </div>
  );
}

export default UserProfile;
