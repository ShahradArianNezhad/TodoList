import Navbar from "../../../components/Navbar"
import { Link, type NavigateFunction } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const registerBackend = async(username:string,password:string,navigate:NavigateFunction)=>{


  const res = await fetch("http://localhost:8000/user/register",{
      method:"POST",
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({
          username:username,
          password:password
      }),
      credentials:'include'
  })

  if (!(await res.json()).token){
    return 0;
  }else{
    navigate("/")
  }
}

const Register = () => {

  const navigate = useNavigate()

  const [username,setUsername] = useState("")
  const [password,setPassword]= useState("")









  return (<>
    <Navbar/>
    <div className="w-screen h-screen bg-[#fffed5] flex justify-center items-center flex-col">
        <h1 className=" text-5xl pb-3 font-bold text-gray-800">Register</h1>
        <div className="w-140 h-120 bg-slate-800 rounded-4xl flex justify-center items-center border-4 border-slate-900 shadow-sm shadow-black">
            <form action="http://localhost:8000/user/register" method="post" className="flex justify-around items-center flex-col w-full h-[60%]">
                <input value={username} onChange={(e)=>{setUsername(e.target.value)}} type="text" name="username" id="username" placeholder="Username" className="bg-gray-900 w-70 px-3 py-2 outline-0 rounded-md text-gray-400 shadow-black shadow-sm focus:shadow-md transition-all duration-100 "/>
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="text" name="password" id="password" placeholder="Password" className="bg-gray-900 w-70 px-3 py-2 outline-0 rounded-md text-gray-400 shadow-black shadow-sm focus:shadow-md transition-all duration-100"/>
                <button onClick={()=>{registerBackend(username,password,navigate)}} type="button" className="font-medium tracking-wide bg-gray-900 w-70 px-3 py-2 outline-0 rounded-md text-gray-400 mt-5 mb-4 cursor-pointer shadow-black shadow-sm hover:shadow-md transition-all duration-100">Register</button>
                <span className="text-sm text-gray-400 tracking-wide font-medium">Already have an account? <Link to="/login" className="text-blue-300 hover:text-blue-400 transition-all duration-200 underline-offset-3 underline cursor-pointer">Login</Link> </span>
            </form>
        </div>
    </div>
    </>
  )
}

export default Register