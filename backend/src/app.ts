import express, {Application,Request,Response,NextFunction} from 'express'
import { connectDB } from './databases/connection';
import { authenticateUser, createUser, getAllUsers, getUserByName } from './services/userservice';
import jwt from 'jsonwebtoken';
import { IUser } from './interfaces/user.interface';
import dotenv from 'dotenv'

const app:Application = express();

dotenv.config()

connectDB()

const PORT = process.env.PORT || 3000;



app.use(express.json())


const authenticateToken=(req:Request,res:Response,next:NextFunction)=>{
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


app.get('api/user/get',async(req:Request,res:Response)=>{
    const result = await getAllUsers()
    res.send(result)
})


app.post('/api/user/register',async(req:Request,res:Response)=>{
    const username = req.body.username
    const password = req.body.password
    const user = await createUser({username:username,password:password})
    if(!user){
        return res.sendStatus(409)
    }
    const token = jwt.sign({userId:user.id},process.env.JWT_SECRET!,{expiresIn:'1h'})
    return res.status(200).json({token})
})

app.post('/api/user/login',async(req:Request,res:Response)=>{
    const username = req.body.username
    const password = req.body.password
    const user = await authenticateUser({username:username,password:password}) as IUser
    if(!user){
        return res.sendStatus(401)
    }
    const token = jwt.sign({userId:user.id},process.env.JWT_SECRET!,{expiresIn:'1h'})
    res.cookie('jwt',token,{
        httpOnly:true,
        maxAge:3600000
    })
    return res.status(200).json({token})
})








app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

