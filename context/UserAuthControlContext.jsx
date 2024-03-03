import { createContext, useContext, useState } from "react";
import { getRoutObjFromPath } from "@/data/routIndexList";
import getAuthenticatedInfo from "@/lib/getAuthenticatedInfo";

const UserAuthControlContext = createContext();

function UserAuthControlProvider({ children }) {
  return (
    <UserAuthControlContext.Provider>
      {children}
    </UserAuthControlContext.Provider>
  );
}

function useUserAuthControl() {}

/*
import { usePathname, useSearchParams } from "next/navigation";

  const pathName = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    console.log("Path Name: ", pathName);
    console.log("Search Params : ", searchParams);
  }, [pathName, searchParams]);
* */
