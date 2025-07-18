import express, {Application,Request,Response,NextFunction} from 'express'

const app:Application = express();

const PORT = process.env.PORT || 3000;


app.use(express.json())

app.get('/',(req:Request,res:Response)=>{
    res.send("hello from server")
})


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})