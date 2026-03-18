import { createContext, useContext, useState, useEffect } from "react";
import { api_url, customer_app_settings, get_website_settings } from "../constants/constant";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [websiteSettings, setWebsiteSettings] = useState(null);
  const [appSettings, setAppSettings] = useState(null);

  useEffect(() => {
    const savedUser = sessionStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const fetchSettings = async () => {
      try {
        const wsRes = await fetch(`${api_url}${get_website_settings}`);
        const wsData = await wsRes.json();
        if (wsData?.status === 1 && wsData?.result) {
          setWebsiteSettings(wsData.result);
        }

        const appRes = await fetch(`${api_url}${customer_app_settings}`);
        const appData = await appRes.json();
        if (appData?.status === 1 && appData?.result) {
          setAppSettings(appData.result);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem("currentUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading,
        websiteSettings,
        appSettings,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
