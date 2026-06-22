import mongoose, { Schema} from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
   name: {type: String, required: true},
   email: {type: String, required: true, unique: true},
    password: { type: String, required: true },
  role: { type: String, enum: ['owner', 'customer'], default: 'customer' }

})

userSchema.pre('save', async function(){
    if(!this.isModified('password'))
        return ;
    this.password = await bcrypt.hash(this.password, 12);
    
})

userSchema.methods.comparePassword = async function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
}



const User = mongoose.model("User", userSchema)
export  default User