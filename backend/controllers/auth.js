import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register= async(req,res,next)=>{
    try{
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const newUser= new Users({
        username:req.body.username,
        email:req.body.email,
        password:hash,
        });

        await newUser.save();
        res.status(200).send('user created')
    }catch(err){
        next(err);
    }
}

export const login= async(req,res,next)=>{
    try{
        const user=await Users.findOne({username:req.body.username});
        if(!user){
            return next(createError(404,'user not found'));
        }

        const isPasswordCorrect= await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect){
            return next(createError(400,'password is incorrect'));
        }
        // if pass correct we create new token
        const token= jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT);
        // we set this token into our cookies

        const{password,isAdmin, ...otherDetails}=user._doc;
        // we do this so password and isAdmin not visible
        // we hide user info in json web token and we send it as a cookie
        res.cookie('access_token',token,{
            httpOnly:true,
        }).status(200).json({...otherDetails});
    }catch(err){
        next(err);
    }
}