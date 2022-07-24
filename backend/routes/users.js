import express from 'express';
import { updateUser,deleteUser,getUser,getAllUsers } from '../controllers/users.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router=express.Router();

router.get('/checkauthentication', verifyToken, (req,res,next)=>{
    res.send('you are logged in!');
})

router.get('/checkuser/:id',verifyToken, verifyUser, (req,res,next)=>{
    res.send('you are logged in and can delete your acc!');
})

router.get('/checkadmin/:id',verifyToken, verifyAdmin, (req,res,next)=>{
    res.send('you are logged in as admin and can delete all accs!');
})

//update
router.put('/:id',verifyToken,verifyUser,updateUser)

//delete
router.delete('/:id',verifyToken,verifyUser,deleteUser)

//get
router.get('/:id',verifyToken,verifyUser,getUser)

//get all
router.get('/',verifyToken,verifyAdmin,getAllUsers)
export default router;