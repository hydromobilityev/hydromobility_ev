import { createContext, useContext, useState, useEffect } from "react";

const RideBookerAuthContext = createContext();
export const useRideBookerAuth = () => useContext(RideBookerAuthContext);

export const RideBookerAuthProvider = ({ children }) => {
  const [rideBooker, setRideBooker] = useState(() => {
    try {
      const storedRideBooker = localStorage.getItem("ride_booker");
      return storedRideBooker ? JSON.parse(storedRideBooker) : null;
    } catch (error) {
      return null;
    }
  });

  useEffect(() => {
    if (rideBooker) {
      localStorage.setItem("ride_booker", JSON.stringify(rideBooker));
    } else {
      localStorage.removeItem("ride_booker");
    }
  }, [rideBooker]);

  const login = (rideBookerData, cb) => {
    setRideBooker(rideBookerData);

    if (cb && typeof cb === "function") {
      setTimeout(cb, 100);
    }
  };

  const logout = () => {
    setRideBooker(null);
    localStorage.removeItem("ride_booker");
  };

  const isRideBookerAuthenticated = !!rideBooker;
  const isCorporateAgent = rideBooker?.user_type === "corporate_agent";

  return (
    <RideBookerAuthContext.Provider
      value={{
        rideBooker,
        setRideBooker,
        login,
        logout,
        isRideBookerAuthenticated,
        isCorporateAgent,
      }}
    >
      {children}
    </RideBookerAuthContext.Provider>
  );
};
