"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Skeleton } from "@nextui-org/react";

import { LogIn, SquareUserRound, PlusSquare, BookUser } from "lucide-react";
import GoalSkeleton from "./GoalSkeletonSvg";

function Navbar({ style }) {
  const { status } = useSession();
  const pathname = usePathname();

  return (
    <nav className={style}>
      {status === "loading" && (
        <>
          {pathname === "/" || pathname.includes("userSuccessList") ? (
            <>
              <NavIconSkeleton />
              <NavIconSkeleton />
              <NavIconSkeleton />
            </>
          ) : (
            <NavIconSkeleton />
          )}
        </>
      )}

      {status === "unauthenticated" && (
        <>
          {pathname === "/" ? (
            <>
              <Login />
              <SuccessLogo />
              <AddSuccess />
            </>
          ) : (
            <SuccessLogo />
          )}
        </>
      )}

      {status === "authenticated" && (
        <>
          {pathname === "/" && (
            <>
              <UserSuccessList />
              <SuccessLogo />
              <AddSuccess />
            </>
          )}
          {pathname.includes("userSuccessList") && (
            <>
              <UserProfile />
              <SuccessLogo />
              <AddSuccess />
            </>
          )}
          {(pathname.includes("editUser") ||
            pathname.includes("addSuccess")) && <SuccessLogo />}
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

const UserProfile = () => (
  <NavbarIcon link={`/editUser`} Icon={SquareUserRound} />
);

const UserSuccessList = () => {
  const { data: session } = useSession();

  return (
    <NavbarIcon
      link={`/userSuccessList/${session?.user?.id}`}
      Icon={BookUser}
    />
  );
};

const SuccessLogo = () => (
  <NavbarIcon link={"/"} Icon={GoalSkeleton} label={"Success"} />
);

const AddSuccess = () => {
  const { status } = useSession();

  return (
    <NavbarIcon
      link={status === "unauthenticated" ? "/login" : "/addSuccess"}
      Icon={PlusSquare}
    />
  );
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
