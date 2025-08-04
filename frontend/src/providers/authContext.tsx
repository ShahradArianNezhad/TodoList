
import { createContext, useState, type ReactNode } from "react";
import type { recievedTask, recievedTaskArr } from "../interfaces/taskRecv";


export interface AuthInterface{
    username:string|null,
    setUseranme:React.Dispatch<React.SetStateAction<string>>,
    auth:boolean,
    setAuth:React.Dispatch<React.SetStateAction<boolean>>,
    loading:boolean,
    TaskList?:recievedTaskArr,
    setTaskList?:React.Dispatch<React.SetStateAction<recievedTaskArr | undefined>>

}


export const AuthContext = createContext<AuthInterface|undefined>(undefined);

// const register = async()=>{

//     await fetch("http://localhost:8000/user/login",{
//         method:"POST",
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify({
//             username:"allahhhhh3",
//             password:"129121271212"
//         }),
//         credentials:'include'
//     })
// }








export const AuthProvider = ({children}:{children:ReactNode})=>{

    const [user, setUser] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading,setIsLoading]= useState(true)
    const [taskList,setTaskList]= useState<recievedTaskArr>()

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
                setTaskList(result.tasks)
                console.log("auth")
            }else{
                console.log("unauth")
            }
            setIsLoading(false)
    }
    auth()


    return(
        <AuthContext.Provider value={{username:user,setUseranme:setUser,auth:isAuthenticated,setAuth:setIsAuthenticated,loading:loading,TaskList:taskList,setTaskList:setTaskList}}>
            {children}
        </AuthContext.Provider>
    )

}






