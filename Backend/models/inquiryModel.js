import { ObjectId } from "mongodb";
import mongoose,{Schema} from "mongoose";

const inquirySchema = new mongoose.Schema ({
      room:{type: ObjectId, ref:'Room', required: true},
      renter: {type:ObjectId, ref: 'User',required: true},
      status: {
        type: String,
        enum:['pending', 'contacted', 'rejected', 'rented'],
        default:'pending'
      },
      createdAt:{type: Date, default: Date.now},
      message:{type: String, default:'' }
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export {Inquiry}