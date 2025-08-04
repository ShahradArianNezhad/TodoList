import { useContext } from 'react'
import { AuthContext } from '../providers/authContext'
import { Link } from 'react-router-dom'


const User = () => {

    const authContext = useContext(AuthContext)

    if(authContext?.loading){
        return (
            <div className='blur-[2px] opacity-30 animate-pulse'>
                    {authContext?.username ? 
                    <p className='text-white font-bold text-lg'>{authContext?.username}</p> 
                    : <>
                        <div className='flex flex-row]'>
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
            <p className='text-white font-bold text-lg'>{authContext?.username}</p> 
            : <>
                <div className='flex flex-row]'>
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