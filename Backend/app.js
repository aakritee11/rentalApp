import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.js";
import roomRoutes from "./routes/room.js";
import uploadRoute from "./routes/upload.js";



const app = express();

app.use(cors());
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true, limit:'10mb'}));
app.use('/api/upload', uploadRoute);


app.set("port", (5000));


app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/uploads', express.static('uploads'));

app.get("/",(req,res)=>{
  res.json({message: "Backend is running!"}) 
 });



 mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
   console.log('Connected to MongoDB');
   app.listen(process.env.PORT || 5000,()=>{
      console.log('Server running on port 5000')
   })
  }).catch(e=> console.log(e));

