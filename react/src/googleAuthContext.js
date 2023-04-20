import { createContext, useContext, useState } from 'react';

const GoogleAuthContext = createContext();

export const useGoogleAuth = () => {
  return useContext(GoogleAuthContext);
};

export const GoogleAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [googleUser, setGoogleUser] = useState(null);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    googleUser,
    setGoogleUser,
  };

  return (
      <GoogleAuthContext.Provider value={value}>
      {children}
      </GoogleAuthContext.Provider>
      );
};
