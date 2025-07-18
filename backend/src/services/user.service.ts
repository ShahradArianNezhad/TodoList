import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user. model";

const createUser = async(userData:IUser)=>{
    try {

        const newuser = new User(userData);
        const saveduser = newuser.save()
        return saveduser;
    } catch (error) {
        throw error
    }
}

const getAllUsers = async()=>{
    try {

        const users = await User.find()
        return users


        
    } catch (error) {
        throw error
    }
}


const getUserById= async(id:string)=>{
    try {
        
        const user = await User.findById(id)
        return user
    } catch (error) {
        throw error
    }
}


const getUserByName=async(username:string)=>{
    try {

        const user = await User.findOne({username})
        return user

        
    } catch (error) {
        throw error
    }
}

const updateUserById=async(id:string,updatedData:Partial<IUser>)=>{
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


const deleteUserById=async(id:string)=>{
    try {
        
        const deletedUser = User.findByIdAndDelete(id)
        return deletedUser  


    } catch (error) {
        throw error
    }
}