import React, { createContext, useEffect, useState } from 'react';

export const ProfileContext = createContext();

const ProfileContextProvider = ({ children }) => {
  const getSessionItem = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    try {
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const [userWatchlist, setUserWatchlist] = useState(() => getSessionItem('userWatchlist', []));


  useEffect(() => {
    localStorage.setItem('userWatchlist', JSON.stringify(userWatchlist));
  }, [userWatchlist]);


  return (
    <ProfileContext.Provider
      value={{
        userWatchlist,
        setUserWatchlist,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
