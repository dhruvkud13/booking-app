import express from 'express';
import { createHotel, deleteHotel, getAllHotels, getHotel, updateHotel } from '../controllers/hotels.js';
import Hotels from '../models/Hotels.js';
import { createError } from '../utils/error.js';
import { verifyAdmin, verifyToken } from '../utils/verifyToken.js';

const router=express.Router();

//create
router.post('/',verifyToken,verifyAdmin,createHotel);

//update
router.put('/:id',verifyToken,verifyAdmin,updateHotel)

//delete
router.delete('/:id',verifyToken,verifyAdmin,deleteHotel)

//get
router.get('/:id',getHotel)

//get all
router.get('/',getAllHotels)

export default router;