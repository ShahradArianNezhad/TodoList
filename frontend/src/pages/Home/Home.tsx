
import { useContext, useEffect } from "react"
import Navbar from "../../components/Navbar"
import { AuthContext } from "../../providers/authContext"






const Home = () => {

  const context= useContext(AuthContext)




  return (
    <div className="w-screen h-screen bg-[#FDFBD4]">
      <Navbar/>
      <div className="flex items-center justify-center">
        {context?.TaskList ? context.TaskList.map((task)=>(<>{task.createDate}</>)):(
          <div className="">
            Youre not logged in,please login to use all of the features!

          </div>
        )}
      </div>
    </div>
  )
}

export default Home