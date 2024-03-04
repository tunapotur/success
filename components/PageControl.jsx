"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getSession } from "next-auth/react";

function PageControl({ children }) {
  const pathName = usePathname();

  useEffect(() => {
    console.log("Path Name :", pathName);
  }, [pathName]);

  useEffect(() => {
    const getPageData = async () => {
      const session = await getSession();
      const userInfo = session?.user;

      console.log("UserInfo :", userInfo);
    };

    getPageData();
  }, []);

  return <>{children}</>;
}

export default PageControl;
