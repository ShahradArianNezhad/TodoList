import express, {Request,Response} from 'express'
import { authenticateUser, createUser, getAllUsers } from '../services/userservice';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';
import cookieInterface from '../interfaces/cookie.interface'
import cookieParser from 'cookie-parser'
import cors from "cors"
import { createTask, getTasks } from '../services/taskservice';


const userRouter = express.Router()

userRouter.use(express.json())
userRouter.use(cookieParser())


userRouter.get('/get',async(req:Request,res:Response)=>{
    const result = await getAllUsers()
    res.send(result)
})


userRouter.post('/register',async(req:Request,res:Response)=>{
    const {username , password}:{username:string|undefined,password:string|undefined} = req.body
    if(!password||!username){
        return res.sendStatus(409)
    }

    const user = await createUser({username:username,password:password})
    if(!user){
        return res.sendStatus(409)
    }
    const token = jwt.sign({username:user.username},process.env.JWT_SECRET!,{expiresIn:'1h'})
    res.cookie('jwt',token,{
        httpOnly:true,
        maxAge:3600000
    })
    return res.status(200).json({token})
})

userRouter.post('/login',async(req:Request,res:Response)=>{
    
    const {username , password}:{username:string|undefined,password:string|undefined} = req.body
    if(!password||!username){
        return res.sendStatus(409)
    }

    const user = await authenticateUser({username:username,password:password}) as IUser
    if(!user){
        return res.sendStatus(401)
    }
    const token = jwt.sign({username:user.username},process.env.JWT_SECRET!,{expiresIn:'1h'})
    res.cookie('jwt',token,{
        httpOnly:true,
        maxAge:3600000,
        sameSite:'none',
        secure:true
    })
    return res.status(200).json({token}).send()
})

userRouter.get('/auth',async(req:Request,res:Response)=>{
    const jwt_cookie = req.cookies.jwt
    const mydata = jwt.decode(jwt_cookie) as cookieInterface|null;
    if(!mydata){
        return res.json({"status":"unauthorized"})
    }

    if(!jwt_cookie){
        return res.json({"status":"unauthorized"})
    }
    const recvTasks = await getTasks(mydata.username)

    
    

    return res.json({"status":"authorized","username":mydata.username,"tasks":recvTasks})



})

userRouter.get('/logout',async(req:Request,res:Response)=>{

    res.cookie('jwt',"",{
        httpOnly:true,
        secure:true,
        sameSite:'none'
    })

    return res.json({"status":"ok"})
})





export default userRouter
