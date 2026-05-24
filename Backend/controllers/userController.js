import  User  from "../models/users.js";
import httpStatus from "http-status";
import  bcrypt from "bcrypt"
import crypto from "crypto"
import jwt from "jsonwebtoken"


const register = async(req, res)=>{
     const {name , password , email, role } = req.body;
      try{
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(httpStatus.FOUND).json({message: "User already exists"});
        }
       
        const newUser = new User({
            name : name,
            email: email,
            password: password,
            role: role
        });
        await newUser.save();

        res.status(httpStatus.CREATED).json({message:"User Registered"});
    }catch(e){
        res.json({message: `Something went wrong ${e}`});
    }

}

const login = async (req, res)=>{
    

        try{
            const {name, password} = req.body;
const user = await User.findOne({name});
if(!user){
    return res.status(httpStatus.NOT_FOUND).json({message: "User not found"});
}
 const isPasswordValid = await bcrypt.compare(password, user.password); 
        if (!isPasswordValid) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid credentials" }); 
        }
  const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });


    }
    catch(e){
return res.status(500).json({message: `Something went wrong ${e}`})
    }
}

export { register , login}