"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { SlLogin } from "react-icons/sl";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import GoalSkelaton from "../GoalSkelatonSvg";

function Navbar() {
  const { status } = useSession();
  const pathname = usePathname();

  //Navbar Icons
  const Login = <NavbarIcon link={"login"} Icon={SlLogin} />;
  const UserProfile = <NavbarIcon link={"userprofile/1"} Icon={FaUser} />;
  const SuccessLogo = (
    <NavbarIcon link={"/"} Icon={GoalSkelaton} label={"Success"} />
  );
  const AddSuccess = (
    <NavbarIcon
      link={status === "unauthenticated" ? "login" : "addsuccess"}
      Icon={FaRegSquarePlus}
    />
  );

  return (
    <nav className="flex h-full flex-row items-center justify-around">
      {pathname === "/" || pathname.includes("/success/") ? (
        <>
          {status === "unauthenticated" ? Login : UserProfile}
          {SuccessLogo}
          {AddSuccess}
        </>
      ) : (
        <>{SuccessLogo}</>
      )}
    </nav>
  );
}

function NavbarIcon({ link, Icon, label }) {
  const { status } = useSession();

  if (status === "loading") return <div>loading...</div>;

  return (
    <Link className="flex flex-col items-center justify-center" href={link}>
      <Icon className={"h-[2.5rem] w-[2.5rem]"} />
      {label && <div className="text-[0.75rem] leading-none">{label}</div>}
    </Link>
  );
}

export default Navbar;
