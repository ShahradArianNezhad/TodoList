
import { createContext, useState, type ReactNode } from "react";


interface AuthInterface{
    username:string|null,
    auth:boolean
}


export const AuthContext = createContext<AuthInterface|undefined>(undefined);

const register = async()=>{

    await fetch("http://localhost:8000/user/login",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            username:"allahhhhh3",
            password:"129121271212"
        }),
        credentials:'include'
    })
}








export const AuthProvider = ({children}:{children:ReactNode})=>{

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const auth = async()=>{
            const res = await fetch("http://localhost:8000/user/auth",{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json'
                },
                credentials:'include'
            })
            const result = (await res.json())
            if (result.status == "authorized"){
                setIsAuthenticated(true)
                setUser(result.username)
                console.log("auth")
            }else{
                console.log("unauth")
            }
    }

    register()
    auth()

    return(
        <AuthContext.Provider value={{username:user,auth:isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )


}






