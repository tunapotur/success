import Image from "next/image";

import DarkLightThemeButton from "./DarkLightThemeButton";

import { SlLogin } from "react-icons/sl";
import { FiPlusCircle } from "react-icons/fi";
import LogoSkeleton from "@/public/goal-skeleton.png";

function Navbar() {
  return (
    <div className="flex flex-row">
      <DarkLightThemeButton />
      <SlLogin />
      <Image
        src={LogoSkeleton}
        alt="Success Skeleton Logo"
        width={40}
        placeholder="blur"
        quality={100}
      />
      <FiPlusCircle />
    </div>
  );
}

export default Navbar;
