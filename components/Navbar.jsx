"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import slugify from "slugify";

import { LogIn, SquareUserRound, PlusSquare } from "lucide-react";
import GoalSkelaton from "./GoalSkelatonSvg";
import { REGEX_SLUGIFY_EMAIL } from "@/data/constants";

function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const userUrl =
    status === "authenticated"
      ? slugify(session?.user?.email, {
          replacement: "_",
          remove: REGEX_SLUGIFY_EMAIL,
        })
      : "";

  //Navbar Icons
  const Login = <NavbarIcon link={"login"} Icon={LogIn} />;
  const UserProfile = (
    <NavbarIcon link={`userprofile/${userUrl}`} Icon={SquareUserRound} />
  );
  const SuccessLogo = (
    <NavbarIcon link={"/"} Icon={GoalSkelaton} label={"Success"} />
  );
  const AddSuccess = (
    <NavbarIcon
      link={status === "unauthenticated" ? "login" : "addsuccess"}
      Icon={PlusSquare}
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
      {!label && <Icon className={"h-[3rem] w-[3rem]"} />}
      {label && <Icon className={"h-[2.5rem] w-[2.5rem]"} />}
      {label && <div className="text-[0.75rem] leading-none">{label}</div>}
    </Link>
  );
}

export default Navbar;
