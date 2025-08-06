
import { useContext, useState } from "react"
import Navbar from "../../components/Navbar"
import { AuthContext } from "../../providers/authContext"
import type { recievedTask } from "../../interfaces/taskRecv"
import trash from "../../assets/trash.svg"





const Home = () => {

  const context= useContext(AuthContext)
  const [task,setTask] = useState("")
  const [date,setDate] = useState("")
  let handlerFunc = ()=>{}

  //for not logged in
  const [tempTasks,setTempTasks] = useState<Array<recievedTask>>([])

  if(!context?.TaskList){
    const DATE= new Date()
    const createdDate:string = DATE.getFullYear().toString()+'-'+DATE.getMonth().toString()+'-'+DATE.getDay().toString()+'T'+DATE.getHours().toString()+":"+DATE.getMinutes().toString()
    handlerFunc = ()=>{
      setTempTasks([...tempTasks,{task:task,todoDate:date,createDate:createdDate,done:false}])
      console.log(tempTasks)
    }
  }else{
    handlerFunc = ()=>{

      const makeCreateReq = async()=>{
        const res = await fetch("http://localhost:8000/api/task/create",{
          method:'POST',
          body:JSON.stringify({
            task:task,
            todoDate:date
          }),
          headers:{
            'Content-Type': 'application/json'
          },
          credentials:'include'
        })
        console.log(await (res.json()))
      }
      makeCreateReq()
      context.refresh()



    }
  }

  return (
    <div className="w-screen bg-[#FDFBD4]">
      <Navbar/>
      <div className=" flex items-center justify-center flex-col mb-50">
        {context && context?.TaskList ? (
          <>
            <div className="text-slate-800 text-2xl font-bold m-8">
              Good day, {context.username}
            </div>
            <div className="flex-col items-center pb-7 transition-all duration-200 shadow shadow-black bg-gray-800 w-2/3 flex justify-center rounded-md border-gray-900 border-2">
              <div className="flex flex-wrap justify-around items-center w-[80%] my-5 py-2 border-2 border-gray-900 rounded-md">
                <input value={task} onChange={(e)=>{setTask(e.target.value)}} placeholder="Task" className="flex-10 bg-gray-900 w-70 my-2 px-3 py-2 outline-0 rounded-md text-gray-400 shadow-black shadow-sm focus:shadow-md transition-all duration-100 mx-3" type="text" name="task" id="task" />
                <input value={date} onChange={(e)=>{setDate(e.target.value)}} placeholder="todo date" className=" flex-2 text-center bg-gray-900 my-2 px-3 py-2 outline-0 rounded-md text-gray-400 shadow-black shadow-sm focus:shadow-md transition-all duration-100 mx-3" type="datetime-local" name="date" id="date" />
                <button onClick={handlerFunc} className="flex-1 font-medium tracking-wide bg-gray-900 my-2 w-70 px-3 py-2 outline-0 rounded-md text-gray-400  cursor-pointer shadow-black mx-3 shadow-sm hover:shadow-md transition-all duration-100">
                  Add Task
                </button>
              </div>
              
              {context.TaskList.map((task)=>(<>
              <div className="flex flex-wrap justify-around items-center w-[80%] my-5 py-2 border-2 border-gray-900 rounded-md">
                <p className="min-w-[80%] overflow-auto flex-5 bg-gray-900 my-2 px-3 py-2 outline-0 rounded-md text-gray-400 shadow-black shadow-sm focus:shadow-md transition-all duration-100 mx-3">{task.task}</p>
                <p className="text-sm text-nowrap flex-1 font-medium tracking-wide bg-gray-900 my-2 px-3 py-2 outline-0 rounded-md text-gray-400  cursor-pointer shadow-black mx-3 shadow-sm hover:shadow-md transition-all duration-100">{task.todoDate.replace('T',' ')}</p>
                <button className="text-sm text-nowrap flex-1 font-medium tracking-wide bg-gray-900 my-2  px-3 py-2 outline-0 rounded-md text-gray-400  cursor-pointer shadow-black mx-3 shadow-sm hover:shadow-md transition-all duration-100">
                  status: {task.done ? "done" : 'not done'}
                </button>
                <button className="flex justify-center items-center text-sm text-nowrap flex-1 font-medium tracking-wide bg-gray-900 my-2  px-3 py-2 outline-0 rounded-md text-gray-400  cursor-pointer shadow-black mx-3 shadow-sm hover:shadow-md transition-all duration-100">
                  <img src={trash} alt="delete" className="w-[30%] text-white" />
                </button>
              </div>
              
              </>))}

            </div>
          </>
        ):(
          <>
            <div className="text-slate-800 text-2xl font-bold my-10">
              Youre not logged in,please login to use all of the features!
            </div>
            <div className="flex-col items-center pb-7 transition-all duration-200 shadow shadow-black bg-gray-800 w-2/3 flex justify-center rounded-md border-gray-900 border-2">
              <div className="flex flex-wrap justify-around items-center w-[80%] my-5 py-2 border-2 border-gray-900 rounded-md">
                <input value={task} onChange={(e)=>{setTask(e.target.value)}} placeholder="Task" className="flex-10 bg-gray-900 w-70 my-2 px-3 py-2 outline-0 rounded-md text-gray-400 shadow-black shadow-sm focus:shadow-md transition-all duration-100 mx-3" type="text" name="task" id="task" />
                <input value={date} onChange={(e)=>{setDate(e.target.value)}} placeholder="todo date" className=" flex-2 text-center bg-gray-900 my-2 px-3 py-2 outline-0 rounded-md text-gray-400 shadow-black shadow-sm focus:shadow-md transition-all duration-100 mx-3" type="datetime-local" name="date" id="date" />
                <button onClick={handlerFunc} className="flex-1 font-medium tracking-wide bg-gray-900 my-2 w-70 px-3 py-2 outline-0 rounded-md text-gray-400  cursor-pointer shadow-black mx-3 shadow-sm hover:shadow-md transition-all duration-100">
                  Add Task
                </button>
              </div>
              
              {tempTasks.map((task)=>(<>
              <div className="flex flex-wrap justify-around items-center w-[80%] my-5 py-2 border-2 border-gray-900 rounded-md">
                <p className="min-w-[80%] overflow-auto flex-5 bg-gray-900 w-70 my-2 px-3 py-2 outline-0 rounded-md text-gray-400 shadow-black shadow-sm focus:shadow-md transition-all duration-100 mx-3">{task.task}</p>
                <p className="text-sm text-nowrap flex-1 font-medium tracking-wide bg-gray-900 my-2 w-70 px-3 py-2 outline-0 rounded-md text-gray-400  cursor-pointer shadow-black mx-3 shadow-sm hover:shadow-md transition-all duration-100">{task.todoDate.replace('T',' ')}</p>
                <button className="text-sm text-nowrap flex-1 font-medium tracking-wide bg-gray-900 my-2 w-70 px-3 py-2 outline-0 rounded-md text-gray-400  cursor-pointer shadow-black mx-3 shadow-sm hover:shadow-md transition-all duration-100">
                  status: {task.done ? "done" : 'not done'}
                </button>
              </div>
              
              </>))}

            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Home