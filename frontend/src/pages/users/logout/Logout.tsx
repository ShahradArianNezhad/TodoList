import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../providers/authContext"



const logout = async()=>{
    await fetch("http://localhost:8000/user/logout",{
        method:"GET",
        headers:{
            'Content-Type': 'application/json'
        },
        credentials:"include"
    })
}




const Logout = () => {
    const navigate = useNavigate()
    const context= useContext(AuthContext)
    
    useEffect(()=>{

        const performLogout = async()=>{
            await logout()
            context?.setAuth(false)
            context?.setUseranme('')
            navigate("/")

        }
        performLogout()
    })




}

export default Logout