import { IUser, IUserInput } from "../interfaces/user.interface";
import { User } from "../models/user. model";
import bcrypt from 'bcrypt';

export const createUser = async(userData:IUserInput)=>{
    try {
        const username = userData.username
        const password = bcrypt.hashSync(userData.password,10)

        const savedata= {"username":username,"password":password}

        const newuser = new User(savedata);
        const saveduser = newuser.save()
        return saveduser;
    } catch (error) {
        throw error
    }
}

export const getAllUsers = async()=>{
    try {

        const users = await User.find()
        return users


        
    } catch (error) {
        throw error
    }
}


export const getUserById= async(id:string)=>{
    try {
        
        const user = await User.findById(id)
        return user
    } catch (error) {
        throw error
    }
}


export const getUserByName=async(username:string)=>{
    try {

        const user = await User.findOne({username})
        return user

        
    } catch (error) {
        throw error
    }
}

export const updateUserById=async(id:string,updatedData:Partial<IUser>)=>{
    try {
        
        const updateduser = User.findByIdAndUpdate(
            id,
            updatedData,
            {new:true}
        )
        return updateduser


    } catch (error) {
        throw error
    }

}


export const deleteUserById=async(id:string)=>{
    try {
        
        const deletedUser = User.findByIdAndDelete(id)
        return deletedUser  


    } catch (error) {
        throw error
    }
}


export const authenticateUser=async(usernamei:string,password:string)=>{
    try{
        const user = await User.findOne({username : usernamei})
        if(!user){
            return "no user"
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return "no pass"
        }

        return user



    }catch(err){
        return err
    }
}