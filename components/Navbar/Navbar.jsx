import Link from "next/link";

import { SlLogin } from "react-icons/sl";
import { FaRegSquarePlus } from "react-icons/fa6";
import GoalSkelaton from "../GoalSkelatonSvg";

const iconSize = "h-[2.5rem] w-[2.5rem]";

function Navbar() {
  return (
    <nav className="flex h-full flex-row items-center justify-around">
      <Register linkUrl={"/login"} />
      <SuccessLogo linkUrl={"/"} />
      <AddSuccess linkUrl={"/login"} />
    </nav>
  );
}

function SuccessLogo({ linkUrl }) {
  return (
    <Link
      className="flex flex-col items-center justify-center"
      href={`${linkUrl}`}
    >
      <GoalSkelaton className={`${iconSize} fill-black dark:fill-white`} />
      <div className="text-[0.75rem] leading-none">Success</div>
    </Link>
  );
}

function Register({ linkUrl }) {
  return (
    <Link href={`${linkUrl}`}>
      <SlLogin className={`${iconSize}`} />
    </Link>
  );
}

function AddSuccess({ linkUrl }) {
  return (
    <Link href={`${linkUrl}`}>
      <FaRegSquarePlus className={`${iconSize}`} />
    </Link>
  );
}

export default Navbar;
