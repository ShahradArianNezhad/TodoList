import { InputItask } from "../interfaces/task.interface"
import { Task } from "../models/task.model"
import { User } from "../models/user. model"




export const createTask = async(task:string,username:string,tododate:string='')=>{

    const user = await User.findOne({username:username})
    if(!user){
        return null
    }
    const curr_date = new Date()
    const savedData:InputItask = {"task":task,createDate:curr_date.toString(),"todoDate":tododate,"done":false,"user":user.id}
    const newTask = new Task(savedData)

    const savedTask = await newTask.save()
    return savedTask
}


export const getTasks = async(id:string)=>{


    const user = await User.find({id:id})
    if(!user){
        return 0
    }
    const tasks = await Task.find({user:id})

    return tasks
}




export const ChangeDone = async(task:InputItask)=>{
    const foundTask = await Task.findOne(task)


    if(!foundTask){
        return null
    }

    foundTask.done=!(foundTask?.done)

    foundTask.save()
    return foundTask

}


export const editTask = async(task:InputItask,newTask:string)=>{


    const foundTask = await Task.findOne(task)


    if(!foundTask){
        return null
    }

    foundTask.task=newTask

    foundTask.save()

    return foundTask
}



export const deleteTask = async(task:InputItask)=>{

    const foundTask = await Task.findOne(task)


    if(!foundTask){
        return null
    }

    return await foundTask.deleteOne()   





}