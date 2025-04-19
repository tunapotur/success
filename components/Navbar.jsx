"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Skeleton } from "@heroui/react";

import { LogIn, SquareUserRound, PlusSquare } from "lucide-react";
import GoalSkeleton from "./GoalSkeletonSvg";

function Navbar({ style }) {
  const { status } = useSession();

  return (
    <nav className={style}>
      {status === "unauthenticated" && (
        <>
          <Login />
          <SuccessLogo />
          <AddSuccess />
        </>
      )}

      {status === "authenticated" && (
        <>
          <UserProfile />
          <SuccessLogo />
          <AddSuccess />
        </>
      )}

      {status === "loading" && (
        <>
          <NavIconSkeleton />
          <NavIconSkeleton />
          <NavIconSkeleton />
        </>
      )}
    </nav>
  );
}

function NavbarIcon({ link, Icon, label }) {
  return (
    <Link className="flex flex-col items-center justify-center" href={link}>
      <>
        {!label && <Icon strokeWidth={1} className={"h-[3rem] w-[3rem]"} />}
        {label && <Icon className={"h-[2.5rem] w-[2.5rem]"} />}
        {label && <div className="text-[0.75rem] leading-none">{label}</div>}
      </>
    </Link>
  );
}

//Navbar Icons
const Login = () => <NavbarIcon link={"/login"} Icon={LogIn} />;

const UserProfile = () => {
  const { data: session } = useSession();

  return (
    <NavbarIcon link={`/user/${session?.user?.id}`} Icon={SquareUserRound} />
  );
};

const SuccessLogo = () => (
  <NavbarIcon link={"/"} Icon={GoalSkeleton} label={"Success"} />
);

const AddSuccess = () => {
  return <NavbarIcon link={"/addSuccess"} Icon={PlusSquare} />;
};

const NavIconSkeleton = () => (
  <Skeleton className="h-[3rem] w-[3rem] rounded-lg" />
);

export default Navbar;

/*
import slugify from "slugify";
import { REGEX_SLUGIFY_EMAIL } from "@/data/constants";
const userUrl =
  status === "authenticated"
    ? slugify(session?.user?.email, {
        replacement: "_",
        remove: REGEX_SLUGIFY_EMAIL,
      })
    : "";
*/
