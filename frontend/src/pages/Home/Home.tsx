import { Navigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { useContext } from "react"
import { AuthContext } from "../../providers/authContext"


const Home = () => {
  const x= useContext(AuthContext)
  if(!x?.auth){
    <Navigate to="/login" replace/>
  }
  console.log(x?.auth)

  return (
    <div className="w-screen h-screen bg-[#FDFBD4]">
      <Navbar/>
    </div>
  )
}

export default Home