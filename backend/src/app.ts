import express, {Application,Request,Response,NextFunction} from 'express'
import { connectDB } from './databases/connection';
import { authenticateUser, createUser, getAllUsers, getUserByName } from './services/userservice';
import jwt from 'jsonwebtoken';
import { IUser } from './interfaces/user.interface';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from "cors"
import cookieInterface from './interfaces/cookie.interface'

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


app.get('/api/user/get',async(req:Request,res:Response)=>{
    const result = await getAllUsers()
    res.send(result)
})


app.post('/api/user/register',async(req:Request,res:Response)=>{
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

app.post('/api/user/login',async(req:Request,res:Response)=>{
    
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

app.get('/api/user/auth',async(req:Request,res:Response)=>{
    const jwt_cookie = req.cookies.jwt
    const mydata = jwt.decode(jwt_cookie) as cookieInterface|null;
    if(!mydata){
        return res.json({"status":"unauthorized"})
    }

    

    

    if(!jwt_cookie){
        return res.json({"status":"unauthorized"})
    }

    return res.json({"status":"authorized","username":mydata.username})



})




app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

