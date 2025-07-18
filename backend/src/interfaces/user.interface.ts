import { Document } from "mongoose";

export interface IUser extends Document{
    username:string;
    password:string;
}

export interface IUserInput{
    username:string;
    password:string;
}