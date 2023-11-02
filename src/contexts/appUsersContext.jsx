import React, { createContext, useContext, useState } from "react";

const AppUsersContext = createContext();

export const AppUsersProvider = ({ children }) => {
  const [details, setDetails] = useState(null);

  return (
    <AppUsersContext.Provider value={{ details, setDetails }}>
      {children}
    </AppUsersContext.Provider>
  );
};

export const useAppUsersContext = () => useContext(AppUsersContext);

export default AppUsersContext;