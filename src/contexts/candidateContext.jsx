import React, { createContext, useContext, useState } from "react";

const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {
  const [details, setDetails] = useState(null);

  return (
    <CandidateContext.Provider value={{ details, setDetails }}>
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidate = () => useContext(CandidateContext);

export default CandidateContext;