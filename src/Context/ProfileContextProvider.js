import React, { createContext, useState } from 'react'

export const ProfileContext = createContext();

const ProfileContextProvider = ({children}) => {

    const [username,setUserName] = useState('')
    const [userPassword,setUserPassword] = useState('')
    const [userEmail,setUserEmail] = useState('')
    const [userWatchlist,setUserWatchlist] = useState([])
    const [loggedIn,setLoggedIn] = useState(false)

  return (
    <ProfileContext.Provider value={{username,setUserName,userEmail,setUserEmail,userPassword,setUserPassword,userWatchlist,setUserWatchlist,loggedIn,setLoggedIn}}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;