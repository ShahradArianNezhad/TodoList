import { Navigate, useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../providers/authContext"


const Home = () => {
  const nav = useNavigate()
  const x= useContext(AuthContext)

  useEffect(()=>{
  if(!x?.auth){
    nav("/login")
  }
  })




  return (
    <div className="w-screen h-screen bg-[#FDFBD4]">
      <Navbar/>
    </div>
  )
}

export default Home