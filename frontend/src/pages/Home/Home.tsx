import { Navigate } from "react-router-dom"


const Home = async() => {
  
  fetch("http://localhost:8000/api/user/auth")
  .then((e)=>{
    console.log(e)
  })



  return (
    <div>Home</div>
  )
}

export default Home