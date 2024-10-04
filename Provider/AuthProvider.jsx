"use client";

import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = (token, userData) => {
    const currentDate = new Date();
    const sevenDaysInSeconds = new Date(
      currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
    );
    Cookies.set("user", JSON.stringify(userData), {
      expires: sevenDaysInSeconds,
    });
    Cookies.set("token", token, { expires: sevenDaysInSeconds });
    Cookies.set("authenticated", "true", {
      expires: sevenDaysInSeconds,
    });
    setAuthenticated(true);
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("authenticated");
    setAuthenticated(false);
    setToken(null);
    setUser(null);
  };

  const updateUserInfo = (data) => {
    setUser(data);
  };

  useEffect(() => {
    const cookieUser = Cookies.get("user");
    const cookieToken = Cookies.get("token");
    const cookieAuthenticated = Cookies.get("authenticated");
  
    if (cookieAuthenticated && cookieToken && cookieUser) {
      try {
        const parsedUser = JSON.parse(cookieUser);
        setAuthenticated(true);
        setToken(cookieToken);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user cookie:", error);
        logout(); // Clears cookies and resets the state
      }
    } else {
      setAuthenticated(false);
      setToken(null);
      setUser(null);
    }
  
    setLoading(false);
  }, []);
  

  return (
<AuthContext.Provider
   value={{
     loading,
     login,
     logout,
     updateUserInfo,
     authenticated,
     token,
     user,
   }}
 >
   {children}
 </AuthContext.Provider>
  );
};

export default AuthProvider;
