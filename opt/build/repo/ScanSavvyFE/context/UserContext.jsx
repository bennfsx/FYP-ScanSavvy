import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    accessToken: null,
    userID: null,
    userType: null,
    firstName: null,
    lastName: null,
  });

  const checkSession = async () => {
    if (sessionStorage.getItem("access") !== null) {
      const sessionAccess = await sessionStorage.getItem("access");
      const userType = await sessionStorage.getItem("userType");
      const userID = await sessionStorage.getItem("userID");
      const firstName = await sessionStorage.getItem("firstName");
      const lastName = await sessionStorage.getItem("lastName");
      setUser({
        accessToken: sessionAccess,
        userID: userID,
        userType: userType,
        firstName: firstName,
        lastName: lastName,
      });
    }
  };

  const logout = () => {
    sessionStorage.clear("access");
    sessionStorage.clear("userType");
    sessionStorage.clear("firstName");
    sessionStorage.clear("lastName");
    console.log("Logged out succesfully!");
    setUser({
      accessToken: null,
      userID: null,
      userType: null,
      firstName: null,
      lastName: null,
    });
  };

  const value = {
    user,
    setUser,
    checkSession,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
