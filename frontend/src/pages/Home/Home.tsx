import { Navigate } from "react-router-dom"


const Home = async() => {
  
  fetch("http://localhost:8000/api/user/auth")



  return (
    <div>Home</div>
  )
}

export default Home