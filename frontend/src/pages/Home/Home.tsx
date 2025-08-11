
import { useContext, useState } from "react"
import Navbar from "../../components/Navbar"
import { AuthContext } from "../../providers/authContext"
import type { recievedTask } from "../../interfaces/taskRecv"
import trash from "../../assets/trash-can.svg"
import pencil from "../../assets/pencil-64.ico"





const Home = () => {

  const context= useContext(AuthContext)
  const [task,setTask] = useState("")
  const [taskErr,setTaskErr] = useState(false)

  const [editMode,setEditMode]= useState("hidden")

  const [doneDisabled,setDoneDisabled]= useState(false)
  
  const [date,setDate] = useState("")
  const [dateErr,setDateErr] = useState(false)

  let handlerFunc = ()=>{}
  let DelHandler = (task:recievedTask)=>{}

  //for not logged in
  const [tempTasks,setTempTasks] = useState<Array<recievedTask>>([])

  if(!context?.TaskList){
    const DATE= new Date()
    const createdDate:string = DATE.getFullYear().toString()+'-'+DATE.getMonth().toString()+'-'+DATE.getDay().toString()+'T'+DATE.getHours().toString()+":"+DATE.getMinutes().toString()
    handlerFunc = ()=>{
      if(!task){
        setTaskErr(true)
        if(!date){
          setDateErr(true)
        }
        return 0
      }else if(!date){
        setDateErr(true)
        if(!task){
          setTaskErr(true)
        }
        return 0
      }
      setTempTasks([...tempTasks,{task:task,todoDate:date,createDate:createdDate,done:false,id:(Math.random()*100).toString()}])
      console.log(tempTasks)
    }
    DelHandler = (task:recievedTask)=>{
      setTempTasks(tempTasks.filter(arrtask =>arrtask!==task))
    }


  }else{
    handlerFunc = ()=>{
      if(!task){
        setTaskErr(true)
        if(!date){
          setDateErr(true)
        }
        return 0
      }else if(!date){
        setDateErr(true)
        if(!task){
          setTaskErr(true)
        }
        return 0
      }
      

      const makeCreateReq = async()=>{
        try{
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
        if(res.ok){
          context.refresh()
        }
        }catch(err){
          console.log("cant make request to the server ,",err)
          return 1
        }
      }
      makeCreateReq()
      



    }

    DelHandler = async(task:recievedTask)=>{
      try{
      const res =await fetch("http://localhost:8000/api/task/delete",{
        method:"DELETE",
        credentials:"include",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(task)
      })
      if ((await res.json()).status == "success"){
        context.refresh()
      }
      }catch{
        console.log("Problem with deletion, is the backend working?")
      }
    }

  }


  const changeDoneHandler = async(task:recievedTask)=>{
    const res = await fetch("http://localhost:8000/api/task/done",
      {
        method:"POST",
        credentials:"include",
        body:JSON.stringify(task),
        headers:{
          "Content-Type":"application/json"
        }
      }
    )

    const parsedRes = (await res.json()).status
    if(parsedRes=="done"){
      context?.refresh()
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
              <div className="relative flex flex-wrap justify-around items-center w-[80%] my-5 py-2 border-2 border-gray-900 rounded-md">
                <input value={task} onChange={(e)=>{setTask(e.target.value)}} placeholder="Task" className="flex-10 bg-gray-900 w-70 my-2 px-3 py-2 outline-0 rounded-md text-gray-400 shadow-black shadow-sm focus:shadow-md transition-all duration-100 mx-3" type="text" name="task" id="task" />
                <input value={date} onChange={(e)=>{setDate(e.target.value)}} placeholder="todo date" className="min-w-70 flex-2 text-center bg-gray-900 my-2 px-3 py-2 outline-0 rounded-md text-gray-400 shadow-black shadow-sm focus:shadow-md transition-all duration-100 mx-3" type="datetime-local" name="date" id="date" />
                <button onClick={handlerFunc} className="flex-1 font-medium tracking-wide bg-gray-900 my-2 w-70 px-3 py-2 outline-0 rounded-md text-gray-400  cursor-pointer shadow-black mx-3 shadow-sm hover:shadow-md transition-all duration-100">
                  Add Task
                </button>
              </div>
              
              {context.TaskList.map((task)=>(
              <div key={task.id} className="flex flex-wrap justify-around items-center w-[80%] my-5 py-2 border-2 border-gray-900 rounded-md">
                <p className="min-w-[80%] overflow-auto flex-5 bg-gray-900 my-2 px-3 py-2 outline-0 rounded-md text-gray-400 shadow-black shadow-sm focus:shadow-md transition-all duration-100 mx-3">{task.task}</p>
                <button className="flex justify-center items-center flex-1 font-medium tracking-wide bg-gray-900 w-20 px-1 py-3 outline-0 rounded-md text-gray-400  cursor-pointer shadow-black mx-3 shadow-sm hover:shadow-md transition-all duration-100">
                  <img src={pencil} className="w-4" />
                </button>
                <p className="text-sm text-nowrap flex-1 font-medium tracking-wide bg-gray-900 my-2 px-3 py-2 outline-0 rounded-md text-gray-400  cursor-pointer shadow-black mx-3 shadow-sm hover:shadow-md transition-all duration-100">{task.todoDate.replace('T',' ')}</p>
                <button className="text-sm text-nowrap flex-1 font-medium tracking-wide bg-gray-900 my-2  px-3 py-2 outline-0 rounded-md text-gray-400  cursor-pointer shadow-black mx-3 shadow-sm hover:shadow-md transition-all duration-100">
                  <input disabled={doneDisabled} type="checkbox" className="mr-2" checked={task.done} onChange={()=>{
                    setDoneDisabled(true)
                    changeDoneHandler(task).then(()=>{setDoneDisabled(false)})
                    }}/>
                  status: {task.done ? "done" : 'not done'}
                </button>
                <button onClick={()=>{DelHandler(task)}} className="flex justify-center items-center text-sm text-nowrap flex-1 font-medium tracking-wide bg-gray-900 my-2  px-3 py-2 outline-0 rounded-md text-gray-400  cursor-pointer shadow-black mx-3 shadow-sm hover:shadow-md transition-all duration-100">
                  <img src={trash} alt="delete" className="w-6 text-white" />
                </button>
              </div>
              
              ))}

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
                <input value={date} onChange={(e)=>{setDate(e.target.value)}} placeholder="todo date" className="min-w-70 flex-2 text-center bg-gray-900 my-2 px-3 py-2 outline-0 rounded-md text-gray-400 shadow-black shadow-sm focus:shadow-md transition-all duration-100 mx-3" type="datetime-local" name="date" id="date" />
                <button onClick={handlerFunc} className="flex-1 font-medium tracking-wide bg-gray-900 my-2 w-70 px-3 py-2 outline-0 rounded-md text-gray-400  cursor-pointer shadow-black mx-3 shadow-sm hover:shadow-md transition-all duration-100">
                  Add Task
                </button>
              </div>
              
              {tempTasks.map((task)=>(<>
              <div className="relative flex flex-wrap justify-around items-center w-[80%] my-5 py-2 border-2 border-gray-900 rounded-md">
                <div className={`flex-col flex justify-center items-center w-full h-full bg-gray-800 opacity-95 absolute border-0 border-gray-900 rounded-md ${editMode}`}>
                  <div className="flex justify-center items-center">
                    <input defaultValue={task.task} onChange={(e)=>{task.task = e.target.value}} placeholder="Task" className="flex-10 bg-gray-900 my-2 px-3 py-2 outline-0 rounded-md text-gray-400 shadow-black shadow-sm focus:shadow-md transition-all duration-100 mx-3" type="text" name="task" id="taskedit" />
                    <input defaultValue={task.todoDate} onChange={(e)=>{task.todoDate = e.target.value}} placeholder="todo date" className="flex-2 text-center bg-gray-900 my-2 px-3 py-2 outline-0 rounded-md text-gray-400 shadow-black shadow-sm focus:shadow-md transition-all duration-100 mx-3" type="datetime-local" name="date" id="dateedit" />
                  </div>
                  <div>
                    <button onClick={()=>{editMode=="hidden" ? setEditMode("block"): setEditMode("hidden")}} className="flex justify-center items-center flex-1 font-medium tracking-wide bg-gray-900 w-20 px-1 py-1 outline-0 rounded-md text-gray-400  cursor-pointer shadow-black mx-3 shadow-sm hover:shadow-md transition-all duration-100">submit</button>
                  </div>
                </div>
                <p className="min-w-[80%] overflow-auto flex-5 bg-gray-900 w-70 my-2 px-3 py-2 outline-0 rounded-md text-gray-400 shadow-black shadow-sm focus:shadow-md transition-all duration-100 mx-3">{task.task}</p>
                <button onClick={()=>{editMode=="hidden" ? setEditMode("block"): setEditMode("hidden")}} className="flex justify-center items-center flex-1 font-medium tracking-wide bg-gray-900 w-20 px-1 py-3 outline-0 rounded-md text-gray-400  cursor-pointer shadow-black mx-3 shadow-sm hover:shadow-md transition-all duration-100">
                  <img src={pencil} className="w-4" />
                </button>
                <p className="text-sm text-nowrap flex-1 font-medium tracking-wide bg-gray-900 my-2 w-70 px-3 py-2 outline-0 rounded-md text-gray-400  cursor-pointer shadow-black mx-3 shadow-sm hover:shadow-md transition-all duration-100">{task.todoDate.replace('T',' ')}</p>
                <button className="flex justify-around items-center text-sm text-nowrap flex-1 font-medium tracking-wide bg-gray-900 my-2 w-70 px-3 py-2 outline-0 rounded-md text-gray-400  cursor-pointer shadow-black mx-3 shadow-sm hover:shadow-md transition-all duration-100">
                  <input disabled={doneDisabled} type="checkbox" className="mr-2" onClick={()=>{
                    task.done=!task.done
                    }}/>
                  status: {task.done ? "done" : 'not done'}
                </button>
                <button onClick={()=>{DelHandler(task)}} className="flex justify-center items-center text-sm text-nowrap flex-1 font-medium tracking-wide bg-gray-900 my-2  px-3 py-2 outline-0 rounded-md text-gray-400  cursor-pointer shadow-black mx-3 shadow-sm hover:shadow-md transition-all duration-100">
                  <img src={trash} alt="delete" className="w-6 text-white" />
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