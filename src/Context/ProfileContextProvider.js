import React, { createContext, useEffect, useState } from 'react';

export const ProfileContext = createContext();

const ProfileContextProvider = ({ children }) => {
  // Utility functions to get and set session storage safely
  const getSessionItem = (key, defaultValue) => {
    const storedValue = sessionStorage.getItem(key);
    try {
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  // State initialization from sessionStorage
  const [username, setUserName] = useState(() => getSessionItem('username', ''));
  const [userPassword, setUserPassword] = useState(() => getSessionItem('userPassword', ''));
  const [userEmail, setUserEmail] = useState(() => getSessionItem('userEmail', ''));
  const [userWatchlist, setUserWatchlist] = useState(() => getSessionItem('userWatchlist', []));
  const [loggedIn, setLoggedIn] = useState(() => getSessionItem('loggedIn', false));

  // Sync each state change to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('username', JSON.stringify(username));
  }, [username]);

  useEffect(() => {
    sessionStorage.setItem('userPassword', JSON.stringify(userPassword));
  }, [userPassword]);

  useEffect(() => {
    sessionStorage.setItem('userEmail', JSON.stringify(userEmail));
  }, [userEmail]);

  useEffect(() => {
    sessionStorage.setItem('userWatchlist', JSON.stringify(userWatchlist));
  }, [userWatchlist]);

  useEffect(() => {
    sessionStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  }, [loggedIn]);

  return (
    <ProfileContext.Provider
      value={{
        username,
        setUserName,
        userEmail,
        setUserEmail,
        userPassword,
        setUserPassword,
        userWatchlist,
        setUserWatchlist,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
