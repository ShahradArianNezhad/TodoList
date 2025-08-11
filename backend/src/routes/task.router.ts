import cookieParser from "cookie-parser"
import express,{Request,Response} from "express"
import jwt from "jsonwebtoken"
import { User } from "../models/user. model"
import cookieInterface from "../interfaces/cookie.interface"
import { Task } from "../models/task.model"
import { ChangeDone, createTask, deleteTask } from "../services/taskservice"
import { InputItask } from "../interfaces/task.interface"





export const TaskRouter = express.Router()

TaskRouter.use(express.json())
TaskRouter.use(cookieParser())




TaskRouter.post("/create",async(req:Request,res:Response)=>{

    const {task,todoDate}:{task:string,todoDate:string} = req.body

    const jwt_cookie = req.cookies.jwt

    const verified = jwt.verify(jwt_cookie,process.env.JWT_SECRET!)
    const jwtData = jwt.decode(jwt_cookie) as cookieInterface
    if(!jwtData || !verified){
        res.json({"status":"not logged in"})
    }
    const username = jwtData.username



    if(verified){
        
        const foundUser =await User.findOne({username:username})

        if(!foundUser){
            res.sendStatus(500)
            return 0
        }
        console.log(123)
        const newTask = await createTask(task,foundUser?.username,todoDate)
        res.json({"status":"success"})

    }else{
        
    }
})




TaskRouter.delete("/delete",async(req:Request,res:Response)=>{


    const {task,todoDate,createDate,done}
    :{task:string,todoDate:string,createDate:string,done:boolean}
    = req.body

    const jwt_cookie = req.cookies.jwt

    const verified = jwt.verify(jwt_cookie,process.env.JWT_SECRET!)
    const jwtData = jwt.decode(jwt_cookie) as cookieInterface
    if(!jwtData || !verified){
        res.json({"status":"not logged in"})
    }
    const username = jwtData.username


    if(verified){
        const userid = (await User.findOne({username:username}))?.id
        const temptask:InputItask={task:task,createDate:createDate,done:done,todoDate:todoDate,user:userid}
        const res = deleteTask(temptask)
        console.log("success")
    }


    
})



TaskRouter.post("/done",async(req:Request,res:Response)=>{
    const {task,todoDate,createDate,done}
    :{task:string,todoDate:string,createDate:string,done:boolean}
    = req.body

    const jwt_cookie = req.cookies.jwt

    const verified = jwt.verify(jwt_cookie,process.env.JWT_SECRET!)
    const jwtData = jwt.decode(jwt_cookie) as cookieInterface
    if(!jwtData || !verified){
        res.json({"status":"not logged in"})
    }
    const username = jwtData.username
    
    if(verified){
        const userid = (await User.findOne({username:username}))?.id
        const temptask:InputItask={task:task,createDate:createDate,done:done,todoDate:todoDate,user:userid}

        const result = await ChangeDone(temptask)
        if(result){
            return res.json({status:"done"})

            
        }
    }
    return res.json({status:"fail"})

    

})