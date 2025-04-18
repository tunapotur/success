"use client";

import { HeroUIProvider as NextUI } from "@heroui/react";
import { useRouter } from "next/navigation";

/*
* Nextui Routing
I added nextui routing specification. Nextui mention it will be useful for cliend side router.
https://nextui.org/docs/guide/routing
*/

export const NextUIProvider = ({ children }) => {
  const router = useRouter();

  return <NextUI navigate={router.push}>{children}</NextUI>;
};
