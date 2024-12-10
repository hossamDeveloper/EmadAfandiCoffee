import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";


export const AuthContext = createContext(null)



export default function AuthContextProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false)
    const [userDetails, setuserDetails] = useState([])
    const [allUsers, setAllUsers] = useState([])


    const getDetails = useCallback(() => {
        if (allUsers.length > 0) {
            const userIs = localStorage.getItem('userIsLogin')
            const details = JSON.parse(localStorage.getItem('userDetails'))
            if (userIs) {
                setIsLogin(userIs)
                setuserDetails(allUsers.find(user => user.id === details))
            }
        }
    })
   



    const getUserDetails = useCallback(async () => {
        await axios.get(`http://localhost:3000/users`)
            .then(response => {
                setAllUsers(response.data)
            })
    })
  

    useEffect(() => {
        getUserDetails()

    }, [])

    useEffect(() => {
        getDetails()
    }, [allUsers])



    return <AuthContext.Provider value={{ isLogin, setIsLogin, userDetails, setuserDetails }}>{children}</AuthContext.Provider>
}