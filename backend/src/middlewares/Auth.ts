import { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken"
import cookieInterface from "../interfaces/cookie.interface"
import { User } from "../models/user. model"

export const checkUserAuth = async(req:Request,res:Response,next:NextFunction)=>{

    const jwt_cookie = req.cookies.jwt
    const verified = jwt.verify(jwt_cookie,process.env.JWT_SECRET!)
    const jwtData = jwt.decode(jwt_cookie) as cookieInterface
    const username = jwtData.username
    const id = (await User.findOne({username:username}))?.id 
    req.body={...req.body,username:username,id:id,verified:verified}
    next()
}