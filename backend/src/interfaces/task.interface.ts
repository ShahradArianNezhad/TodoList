import { Document } from "mongoose";
import { IUser } from "./user.interface";

export interface Itask extends Document{
    task:string;
    createDate:string;
    todoDate:string;
    done:boolean;
    user:IUser;
}


export interface InputItask{
    task:string;
    createDate:string;
    todoDate:string;
    done:boolean;
    user:IUser;
}