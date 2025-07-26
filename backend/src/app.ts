import express, {Application,Request,Response,NextFunction} from 'express'
import { connectDB } from './databases/connection';
import { authenthicateUser, createUser, getAllUsers, getUserByName } from './services/user.service';


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







app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

