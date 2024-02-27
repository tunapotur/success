"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Skeleton } from "@nextui-org/react";

import { LogIn, SquareUserRound, PlusSquare, BookUser } from "lucide-react";
import GoalSkelaton from "./GoalSkelatonSvg";

function Navbar({ style }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  //Navbar Icons
  const Login = () => <NavbarIcon link={"/login"} Icon={LogIn} />;
  const UserProfile = () => <NavbarIcon link={`/user`} Icon={SquareUserRound} />;
  const UserSuccessList = () => <NavbarIcon link={`/successList/${session?.user?.id}`} Icon={BookUser} />;
  const SuccessLogo = () =>
    <NavbarIcon link={"/"} Icon={GoalSkelaton} label={"Success"} />
  ;
  const AddSuccess = () =>
    <NavbarIcon
      link={status === "unauthenticated" ? "/login" : "/addSuccess"}
      Icon={PlusSquare}
    />
  ;

  return (
    <nav className={style}>
      {status === "authenticated" &&
        (<>
          {pathname === "/" && <UserSuccessList />}
          {pathname.includes("successList") && <UserProfile />}
          <SuccessLogo />
          {(pathname === "/" || pathname.includes("successList")) && <AddSuccess />}
        </>)}
      {status === "unauthenticated" &&
        (<>
          {pathname === "/" && <Login />}
          <SuccessLogo />
          {pathname === "/" && <AddSuccess />}
        </>)}
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
          {!label && <Icon strokeWidth={1} className={"h-[3rem] w-[3rem]"} />}
          {label && <Icon className={"h-[2.5rem] w-[2.5rem]"} />}
          {label && <div className="text-[0.75rem] leading-none">{label}</div>}
        </>
      )}
    </Link>
  );
}

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

/*
      {pathname === "/" || pathname.includes("/success/") ? (
        <>
          {status === "unauthenticated" ? Login : UserProfile}
          {SuccessLogo}
          {AddSuccess}
        </>
      ) : (
        <>{SuccessLogo}</>
      )}
*/

/*
      {status === "loading" ? (
        <Skeleton className="h-[3rem] w-[3rem] rounded-lg" />
      ) : (
        <>
          {!label && <Icon strokeWidth={1} className={"h-[3rem] w-[3rem]"} />}
          {label && <Icon className={"h-[2.5rem] w-[2.5rem]"} />}
          {label && <div className="text-[0.75rem] leading-none">{label}</div>}
        </>
      )}
*/

export default Navbar;
