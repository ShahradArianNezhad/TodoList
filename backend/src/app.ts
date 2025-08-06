import express, {Application,Request,Response,NextFunction} from 'express'
import { connectDB } from './databases/connection';
import { authenticateUser, createUser, getAllUsers, getUserByName } from './services/userservice';
import jwt from 'jsonwebtoken';
import { IUser } from './interfaces/user.interface';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from "cors"
import cookieInterface from './interfaces/cookie.interface'
import userRouter from './routes/user.router';
import { TaskRouter } from './routes/task.router';

const app:Application = express();


dotenv.config()

connectDB()

const PORT = process.env.PORT || 3000;


const corsOptions={
    origin:'http://localhost:5173',
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}





app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use('/user',userRouter)
app.use('/api/task',TaskRouter)


const authenticateToken=async(req:Request,res:Response,next:NextFunction)=>{
    let token:string|undefined
    const authHeader = req.headers['authorization']
    if(!authHeader){
        try{
        token = req.cookies.jwt
        }catch(err){}
    }else{
        token = authHeader && authHeader.split(' ')[1]
    }
    if(!token) return res.sendStatus(401)
    jwt.verify(token,process.env.JWT_SECRET!,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user=user
        next()
    })
}




app.get('/',authenticateToken,(req:Request,res:Response)=>{
    res.send("hello from server")
})





app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

