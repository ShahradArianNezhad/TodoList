import { useNavigate } from "react-router-dom"

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
    logout()
    navigate("/")
    navigate(0)

  return (
    <div>
        
        
        
    </div>
  )
}

export default Logout