import Navbar from "../../../components/Navbar"
import { Link } from 'react-router-dom';



const Login = () => {
  return (<>
    <Navbar/>
    <div className="w-screen h-screen bg-[#fffed5] flex justify-center items-center flex-col">
        <h1 className="text-5xl pb-3 font-bold text-gray-800">Login</h1>
        <div className="w-140 h-120 bg-slate-800 rounded-4xl flex justify-center items-center border-4 border-slate-900 shadow-sm shadow-black">
            <form action="http://localhost:8000/user/login" method="post" className="flex justify-around items-center flex-col w-full h-[60%]">
                <input type="text" name="username" id="username" placeholder="Username" className="bg-gray-900 w-70 px-3 py-2 outline-0 rounded-md text-gray-400 shadow-black shadow-sm focus:shadow-md transition-all duration-100 "/>
                <input type="text" name="password" id="password" placeholder="Password" className="bg-gray-900 w-70 px-3 py-2 outline-0 rounded-md text-gray-400 shadow-black shadow-sm focus:shadow-md transition-all duration-100"/>
                <button type="submit" className="font-medium tracking-wide bg-gray-900 w-70 px-3 py-2 outline-0 rounded-md text-gray-400 mt-5 mb-4 cursor-pointer shadow-black shadow-sm hover:shadow-md transition-all duration-100">Login</button>
                <span className="text-sm text-gray-400 tracking-wide font-medium">Dont have an account? <Link to="/register" className="text-blue-300 hover:text-blue-400 transition-all duration-200 underline-offset-3 underline cursor-pointer">Register</Link> </span>
            </form>
        </div>
    </div>
    </>
  )
}

export default Login