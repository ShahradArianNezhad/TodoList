import { useContext, useState } from 'react'
import { AuthContext } from '../providers/authContext'
import { Link, useNavigate } from 'react-router-dom'


const logout = async()=>{
    await fetch("http://localhost:8000/user/logout",{
        method:"GET",
        headers:{
            'Content-Type': 'application/json'
        },
        credentials:"include"
    })
}









const User = () => {
  const context = useContext(AuthContext)

  const nav = useNavigate()

  const [isOpen,setIsOpen]= useState(false)

  const performLogout = async()=>{
        await logout()
        if(context){
        await context.refresh()
        }
        nav("/")
  }





    const authContext = useContext(AuthContext)

    if(authContext?.loading){
        return (
            <div className='blur-[2px] opacity-30 animate-pulse'>
                    {authContext?.username ? 
                    <p className='text-white font-bold text-lg'>{authContext?.username}</p> 
                    : <>
                        <div className='flex flex-row '>
                        <Link to="/login" className='text-white font-bold text-lg'>login</Link>
                        <p className='text-white font-bold text-lg mx-1'>|</p>
                        <Link to="/register" className='text-white font-bold text-lg '>register</Link>
                        </div>
                    </>

                    }
                    
            </div>
        )
    }



  return (
    <div>
            {authContext?.username ? 
            <div className='relative flex justify-center'>
              {isOpen ? (<div className='absolute text-white cursor-pointer font-bold text-md top-10 bg-gray-800 w-15 h-12 flex justify-center items-center rounded-b-xl transition-all duration-200'><button className='cursor-pointer' onClick={performLogout}>logout</button ></div>):(
                <div className='absolute text-white cursor-pointer font-bold text-md top-10 bg-gray-800 w-15 h-12 flex justify-center items-center rounded-b-xl transition-all duration-150 opacity-0'><p>logout</p></div>
              )}
              <button onClick={()=>{setIsOpen(!isOpen)}} className='text-white cursor-pointer font-bold text-lg'>{authContext?.username}</button> 
            </div>
            : <>
                <div className='flex flex-row cursor-pointer'>
                  <Link to="/login" className='text-white font-bold text-lg'>login</Link>
                  <p className='text-white font-bold text-lg mx-1'>|</p>
                  <Link to="/register" className='text-white font-bold text-lg '>register</Link>
                </div>
              </>

            }
            
    </div>
  )
}

export default User