import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcryptjs';


const userSchema = new Schema<IUser>({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true}
});

userSchema.pre<IUser>('save',async function(next){
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()

})


userSchema.methods.comparePassword=async function(candidatePassword:string):Promise<Boolean>{
    return bcrypt.compare(candidatePassword,this.password)
}

export const User = model<IUser>('User',userSchema);