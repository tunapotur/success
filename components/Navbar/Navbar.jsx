"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import { SlLogin } from "react-icons/sl";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import GoalSkelaton from "../GoalSkelatonSvg";

const iconSize = "h-[2.5rem] w-[2.5rem]";

/**
 * loading
 * unauthenticated
 * authenticated
 */

function Navbar() {
  const { data, status } = useSession();
  const pathname = usePathname().substring(1);

  return (
    <nav className="flex h-full flex-row items-center justify-around">
      {status === "loading" && (
        <>
          <span>loading...</span>
          <span>loading...</span>
          <span>loading...</span>
        </>
      )}

      {status === "unauthenticated" && (
        <>
          <Login />
          <SuccessLogo />
          <AddSuccess />
        </>
      )}

      {status === "authenticated" && (
        <>
          <SuccessLogo />
        </>
      )}
    </nav>
  );
}

function SuccessLogo() {
  return (
    <Link className="flex flex-col items-center justify-center" href={"/"}>
      <GoalSkelaton className={`${iconSize} fill-black dark:fill-white`} />
      <div className="text-[0.75rem] leading-none">Success</div>
    </Link>
  );
}

function Login() {
  const { status } = useSession();

  if (status === "unauthenticated")
    return (
      <Link href={"/login"}>
        <SlLogin className={`${iconSize}`} />
      </Link>
    );

  if (status === "authenticated") return null;
}

function UserProfile() {
  const { status } = useSession();

  if (status === "unauthenticated") return null;

  if (status === "authenticated")
    return (
      <Link href={"/userprofile"}>
        <FaUser className={`${iconSize}`} />
      </Link>
    );
}

function AddSuccess({ linkUrl }) {
  const { status } = useSession();

  return (
    <Link href={status === "unauthenticated" ? "login" : "addsuccess"}>
      <FaRegSquarePlus className={`${iconSize}`} />
    </Link>
  );
}

export default Navbar;

/*



function TopNav() {
  const { data, status } = useSession();

  return (
    <nav className="flex h-[3.5rem] flex-row items-center font-semibold shadow-lg">
      <Link href="/" className="pl-4 text-[1.2rem]">
        🗝️ Next Auth
      </Link>

      <div className="ml-auto space-x-4 pr-5">
        {status === "authenticated" ? (
          <div className="flex flex-row items-center space-x-6">
            <p className="text-sm font-normal">
              {data?.user?.name} ({data?.user?.role})
            </p>
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              Logout
            </button>
          </div>
        ) : status === "loading" ? (
          "Loading..."
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default TopNav;


*/
