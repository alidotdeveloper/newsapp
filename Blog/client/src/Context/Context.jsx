import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [Auth, setAuth] = useState(false);
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState("");
  const [role, setrole] = useState("");

  return (
    <AuthContext.Provider
      value={{
        Auth,
        setAuth,
        setUser,
        user,
        userData,
        setUserData,
        setrole,
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
