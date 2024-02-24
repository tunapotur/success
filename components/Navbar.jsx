"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Skeleton } from "@nextui-org/react";

import { LogIn, SquareUserRound, PlusSquare } from "lucide-react";
import GoalSkelaton from "./GoalSkelatonSvg";

function Navbar({ style }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  /*   
  import slugify from "slugify";
import { REGEX_SLUGIFY_EMAIL } from "@/data/constants";
  const userUrl =
    status === "authenticated"
      ? slugify(session?.user?.email, {
          replacement: "_",
          remove: REGEX_SLUGIFY_EMAIL,
        })
      : ""; */

  //Navbar Icons
  const Login = <NavbarIcon link={"login"} Icon={LogIn} />;
  const UserProfile = <NavbarIcon link={`user`} Icon={SquareUserRound} />;
  const SuccessLogo = (
    <NavbarIcon link={"/"} Icon={GoalSkelaton} label={"Success"} />
  );
  const AddSuccess = (
    <NavbarIcon
      link={status === "unauthenticated" ? "login" : "addSuccess"}
      Icon={PlusSquare}
    />
  );

  return (
    <nav className={style}>
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

  return (
    <Link className="flex flex-col items-center justify-center" href={link}>
      {status === "loading" ? (
        <Skeleton className="h-[3rem] w-[3rem] rounded-lg" />
      ) : (
        <>
          {!label && <Icon className={"h-[3rem] w-[3rem]"} />}
          {label && <Icon className={"h-[2.5rem] w-[2.5rem]"} />}
          {label && <div className="text-[0.75rem] leading-none">{label}</div>}
        </>
      )}
    </Link>
  );
}

export default Navbar;
