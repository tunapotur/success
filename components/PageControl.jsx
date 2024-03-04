"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getRoutObjFromRoutIndexList } from "@/data/routIndexList";

//TODO: loading durumunu unutma.Prob olarak skeleton alınıp yüklenebilir
function PageControl({ children, loading }) {
  const pathName = usePathname();
  const [routObj, setRoutObj] = useState(null);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setRoutObj(getRoutObjFromRoutIndexList(pathName));

    if (status === "unauthenticated") {
      if (routObj.redirect.when === "unauthenticated") {
        router.push(routObj.redirect.link);
      }
    }
  }, [pathName, routObj, router, status]);

  if (status === "loading") {
    return <h1>{loading}</h1>;
  }

  if (routObj === null) return;

  return <>{children}</>;
}

export default PageControl;
