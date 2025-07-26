import express, {Application,Request,Response,NextFunction} from 'express'
import { connectDB } from './databases/connection';
import { authenticateUser, createUser, getAllUsers, getUserByName } from './services/userservice';


const app:Application = express();

connectDB()

const PORT = process.env.PORT || 3000;



app.use(express.json())

app.get('/',(req:Request,res:Response)=>{
    res.send("hello from server")
})

app.get('/new',async(req:Request,res:Response)=>{
    res.send("newuser from server")
    await createUser({
        username : "assasasasasassa",
        password : "2135"
    })
})


app.get('/get',async(req:Request,res:Response)=>{
    const result = await getAllUsers()
    res.send(result)
})


app.post('/user/register',async(req:Request,res:Response)=>{
    const username = req.body.username
    const password = req.body.password
    const result = await createUser({username:username,password:password})
    if(!result){
        res.sendStatus(409)
    }
    res.sendStatus(201)
})

app.post('/user/login',async(req:Request,res:Response)=>{
    const username = req.body.username
    const password = req.body.password
    const result = await authenticateUser({username:username,password:password})
    if(!result){
        res.sendStatus(401)
    }
    res.sendStatus(200)
})









app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

