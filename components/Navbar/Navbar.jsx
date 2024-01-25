"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import { SlLogin } from "react-icons/sl";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import GoalSkelaton from "../GoalSkelatonSvg";

const iconSize = "h-[2.5rem] w-[2.5rem]";

function Navbar() {
  const { status } = useSession();
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-row items-center justify-around">
      {pathname === "/" || pathname === "/successdetail" ? (
        <>
          {status === "unauthenticated" ? <Login /> : <UserProfile />}
          <SuccessLogo />
          <AddSuccess />
        </>
      ) : (
        <SuccessLogo />
      )}
    </nav>
  );
}

// TODO: Logo fonksiyonları için fonksiyon döndüren bir pattern vardı onunla kod tekrarını düzelt

function SuccessLogo() {
  const { status } = useSession();

  if (status === "loading") return <div>loading...</div>;

  return (
    <Link className="flex flex-col items-center justify-center" href={"/"}>
      <GoalSkelaton className={`${iconSize} fill-black dark:fill-white`} />
      <div className="text-[0.75rem] leading-none">Success</div>
    </Link>
  );
}

function Login() {
  const { status } = useSession();

  if (status === "loading") return <div>loading...</div>;

  return (
    <Link href={"/login"}>
      <SlLogin className={`${iconSize}`} />
    </Link>
  );
}

function UserProfile() {
  const { status } = useSession();

  if (status === "loading") return <div>loading...</div>;

  return (
    <Link href={"/userprofile/1"}>
      <FaUser className={`${iconSize}`} />
    </Link>
  );
}

function AddSuccess({ linkUrl }) {
  const { status } = useSession();

  if (status === "loading") return <>loading...</>;

  return (
    <Link href={status === "unauthenticated" ? "login" : "addsuccess"}>
      <FaRegSquarePlus className={`${iconSize}`} />
    </Link>
  );
}

export default Navbar;
