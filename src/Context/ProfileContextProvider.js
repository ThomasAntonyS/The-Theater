import React, { useState,createContext } from 'react'

export const ProfileContext = createContext()

const ProfileContextProvider = ({children}) => {

    const [username,setUserName] = useState('')
    const [userEmail,setUserEmail] = useState('')
    const [userWatchlist,setUserWatchlist] = useState([])

  return (
    <>
        <ProfileContext.Provider value={{username,setUserName,userEmail,setUserEmail,userWatchlist,setUserWatchlist}}>
            {children}
        </ProfileContext.Provider>
    </>
  )

}

export default ProfileContextProvider