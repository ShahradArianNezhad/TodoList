import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../providers/authContext"

type Props = {}


const logout = async()=>{
    const res = await fetch("http://localhost:8000/user/logout",{
        method:"GET",
        headers:{
            'Content-Type': 'application/json'
        },
        credentials:"include"
    })
}




const Logout = (props: Props) => {
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