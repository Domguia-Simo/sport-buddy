import React ,{useState ,createContext } from "react";

const UserContext = createContext(null)

export const UserProvider =({children})=>{
    const [user ,setUser] = useState(null)

    return <UserContext.Provider value={{user:user ,setUser:setUser}} >{children}</UserContext.Provider>
}

export default UserContext