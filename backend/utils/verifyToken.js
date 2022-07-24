// import jwt from "jsonwebtoken";
// import { createError } from "../utils/error.js";

// export const verifyToken = (req, res, next) => {
//     const token= req.cookies.access_token;
//     if(!token){
//         return next(createError(401,'no token'));
//     }

//     // verify token if it matches
//     jwt.verify(token,process.env.JWT,(err,user)=>{
//         if(err){
//             return next(createError(403,'invalid token'));
//         }

//         req.user=user;
//         next();
//             // runs middleware and if error returns, if no error it checks token
//             // and we go to next operation
//     });
//     // returns info about error and user
// };

// export const verifyUser=(req,res,next)=>{
//     verifyToken(req,res,next,()=>{
//         if(req.user.id===req.params.id){
//             // user.id is inside jwt, if both are equal we are the owner
//             console.log(req.user.id);
//             console.log(req.params.id);
//             next();
            
//         }
//         else{
//             return next(createError(403,'you are not the owner'));
//         }
//     })
//     // after verifying token we enter this function finally to verify user and then we go to checkuser route
// }

// export const verifyAdmin=(req,res,next)=>{
//     verifyToken(req,res,next,()=>{
//         if(req.user.isAdmin){
//             // user.id is inside jwt, if both are equal we are the owner
//             next();
//         }
//         else{
//             return next(createError(403,'you are not the owner'));
//         }
//     });
//     // after verifying token we enter this function finally to verify user and then we go to checkuser route
// };

import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken =(req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) {
    console.log('hi from if')
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    console.log(user);
    next();
  });
};

export const verifyUser = (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     console.log('hello token');
    if (req.user.id === req.params.id || req.user.isAdmin) {
        console.log('hiiiiiiii')
      next();
    } else {
        console.log('yo')
      return next(createError(403, "You are not authorized!"));
    }
//   });
};

export const verifyAdmin = (req, res, next) => {
//   verifyToken(req, res, next, () => {
  // console.log(req.user)
    if (req.user.isAdmin) {
      // console.log(isAdmin);
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
//   });
};