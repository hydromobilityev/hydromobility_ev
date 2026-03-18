import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import {
  api_url,
  customer_app_settings,
  customer_get_about,
} from "../constants/constant";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

const APPLIED_PROMO_KEY = "appliedPromoIds";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = sessionStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      return null;
    }
  });

  const [appSettings, setAppSettings] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aboutLoading, setAboutLoading] = useState(false);

  const [appliedPromoIds, setAppliedPromoIds] = useState(() => {
    try {
      const storedIds = localStorage.getItem(APPLIED_PROMO_KEY);
      return storedIds ? JSON.parse(storedIds) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    try {
      const storedIds = localStorage.getItem(APPLIED_PROMO_KEY);
      if (storedIds) {
        const parsedIds = JSON.parse(storedIds);
        setAppliedPromoIds(parsedIds);
      } else {
        setAppliedPromoIds([]);
      }
    } catch (err) {
      setAppliedPromoIds([]);
    }
  }, []);

  const saveAppliedPromoId = useCallback((promoId) => {
    try {
      const storedIds = localStorage.getItem(APPLIED_PROMO_KEY);
      let idsArray = storedIds ? JSON.parse(storedIds) : [];

      if (!idsArray.includes(promoId)) {
        idsArray.push(promoId);
        localStorage.setItem(APPLIED_PROMO_KEY, JSON.stringify(idsArray));
        setAppliedPromoIds(idsArray);
        return true;
      }
      return true;
    } catch (error) {
      return false;
    }
  }, []);

  const removeAppliedPromoId = useCallback((promoId) => {
    try {
      const storedIds = localStorage.getItem(APPLIED_PROMO_KEY);
      if (storedIds) {
        let idsArray = JSON.parse(storedIds);
        idsArray = idsArray.filter((id) => id !== promoId);
        localStorage.setItem(APPLIED_PROMO_KEY, JSON.stringify(idsArray));
        setAppliedPromoIds(idsArray);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }, []);

  const isPromoApplied = useCallback(
    (promoId) => {
      return appliedPromoIds.includes(promoId);
    },
    [appliedPromoIds],
  );

  const clearAppliedPromoIds = useCallback(() => {
    localStorage.removeItem(APPLIED_PROMO_KEY);
    setAppliedPromoIds([]);
  }, []);

  // Fetch app settings
  useEffect(() => {
    const init = async () => {
      try {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }

        const { data } = await axios.get(`${api_url}${customer_app_settings}`);
        if (data.status === 1 && data.result) {
          setAppSettings(data.result);
        }

        await fetchAboutData("en");
      } catch (err) {}

      setLoading(false);
    };

    init();
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
      clearAppliedPromoIds();
    }
  }, [user, clearAppliedPromoIds]);

  // Fetch about
  const fetchAboutData = async (language = "en") => {
    setAboutLoading(true);
    try {
      const response = await axios.post(`${api_url}${customer_get_about}`, {
        lang: language,
      });

      if (response.data.status === 1 && response.data.result) {
        const aboutWithLanguage = {
          ...response.data.result,
          language: language,
          timestamp: new Date().toISOString(),
        };

        setAboutData(aboutWithLanguage);
        return aboutWithLanguage;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    } finally {
      setAboutLoading(false);
    }
  };

  // Login
  const login = (userData, cb) => {
    setUser(userData);

    if (cb && typeof cb === "function") {
      setTimeout(cb, 100);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setAboutData(null);
    clearAppliedPromoIds();
    sessionStorage.removeItem("user");
  };

  // Helper
  const isAuthenticated = !!user;
  const isCorporateCustomer = user?.user_type === "corporate_customer";
  const isCorporateAgent = user?.user_type === "corporate_agent";

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isAuthenticated,
        isCorporateCustomer,
        isCorporateAgent,
        appSettings,
        loading,

        aboutData,
        aboutLoading,
        fetchAboutData,

        appliedPromoIds,
        saveAppliedPromoId,
        removeAppliedPromoId,
        isPromoApplied,
        clearAppliedPromoIds,
        setAppliedPromoIds,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
