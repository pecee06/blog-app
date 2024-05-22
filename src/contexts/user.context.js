import { createContext, useContext } from "react"

const UserContext = createContext({
    userData: {},
    setUserData: (data)=>{},
    loggedIn: false,
    login: ()=>{},
    logout: ()=>{}
})

const UserProvider = UserContext.Provider

function useUserContext() {
    return useContext(UserContext)
}

export {UserProvider, useUserContext}