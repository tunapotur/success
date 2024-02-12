// TODO Buna gerek kalmayabilir silinecek

import { createContext, useContext, useEffect, useState } from "react";

const UserProfileContext = createContext();

function UserProfileProvider({ children }) {
  const [themeSelection, setThemeSelection] = useState("system");

  return (
    <UserProfileContext.Provider value={{ themeSelection, setThemeSelection }}>
      {children}
    </UserProfileContext.Provider>
  );
}

function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined)
    throw new Error(
      "UserProfileContext was used outside of UserProfileProvider",
    );
  return context;
}

export { UserProfileProvider, useUserProfile };
