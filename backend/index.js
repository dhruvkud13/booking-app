import express from 'express'
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import roomsRoute from './routes/rooms.js';
import hotelsRoute from './routes/hotels.js';

const app= express();
dotenv.config();

const connect =async () => {
    // await mongoose.connect(process.env.MONGO)
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to Mongo");
      } catch (error) {
        throw error;
      }
  };

mongoose.connection.on('disconnected',()=>{
    console.log("Disconnected from MongoDB");
})

//adding middlewares
// middlewares are able to reach our req or response
// when user makes api req server checks all routes here
app.use(express.json())
// as we cant send json data directly to express server

app.use('/api/auth',authRoute);
app.use('/api/users',usersRoute);
app.use('/api/rooms',roomsRoute);
app.use('/api/hotels',hotelsRoute);

app.listen(8000,()=>{
    connect();
    console.log('backend connected')
})