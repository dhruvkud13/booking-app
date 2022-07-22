import express from 'express';
import Hotels from '../models/Hotels.js';

const router=express.Router();

//create
router.post('/',async (req,res)=>{
    const newHotel= new Hotels(req.body);
    try{
        const savedHotel= await newHotel.save();
        res.status(200).json(savedHotel);
    }catch(err){
        res.status(500).json(err);
    }
})

//update
router.put('/:id',async (req,res)=>{
    // const newHotel= new Hotels(req.body);
    try{
        const updatedHotel= await Hotels.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        // new:true needed coz findbyid returns prev document
        res.status(200).json(updatedHotel);
    }catch(err){
        res.status(500).json(err);
    }
})

//delete
router.delete('/:id',async (req,res)=>{
    // const newHotel= new Hotels(req.body);
    try{
        await Hotels.findByIdAndDelete(req.params.id);
        res.status(200).json('hotel deleted');
    }catch(err){
        res.status(500).json(err);
    }
})

//get
router.get('/:id',async (req,res)=>{
    // const newHotel= new Hotels(req.body);
    try{
        const hotel= await Hotels.findById(req.params.id);
        res.status(200).json(hotel);
    }catch(err){
        res.status(500).json(err);
    }
})

//get all
router.get('/',async (req,res)=>{
    // const newHotel= new Hotels(req.body);
    try{
        const hotels= await Hotels.find(req.params.id);
        res.status(200).json(hotels);
    }catch(err){
        res.status(500).json(err);
    }
})

export default router;