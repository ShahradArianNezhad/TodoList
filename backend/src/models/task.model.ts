import { model, Schema } from "mongoose";
import { Itask } from "../interfaces/task.interface";
import { userSchema } from "./user. model";


const TaskSchema = new Schema<Itask>({
    task:{type:String,required:true},
    createDate:{type:String,required:true},
    todoDate:{type:String,required:false},
    done:{type:Boolean,required:true},
    user: { type: Schema.Types.ObjectId, ref: 'User' }
    
})


export const Task = model<Itask>('Task',TaskSchema);