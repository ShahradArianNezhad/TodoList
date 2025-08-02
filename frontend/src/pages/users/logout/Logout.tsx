import { useContext } from "react"
import { AuthContext } from "../../../providers/authContext"
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom"

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

    logout()

  return (
    <div>
        <Navigate to="/" replace/>
    </div>
  )
}

export default Logout