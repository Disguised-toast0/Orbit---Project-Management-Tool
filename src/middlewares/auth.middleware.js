import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { Asynchandler } from "../utils/Asynchandler.js";
import { ApiError } from "../utils/api-error.js";



export const verifyJWT = Asynchandler(async (req, res, next)=>{
          const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

           if(!token){
            throw new ApiError(401, "Unauthorized request")
           }

           try {
              const decodedtoken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
              const user =  User.findById(decodedtoken?._id).select(
                "-password -refreshtoken -emailVerificationToken -emailVerificationExpiry" )

                if(!user){
                    throw new ApiError(401,"invalid access token")
                }
              req.user = user
              next()
           } catch (error) {
                throw new ApiError(401,"Invalid access token")
           }
})
