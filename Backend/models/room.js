import mongoose , { Schema} from 'mongoose'


const roomSchema = new mongoose.Schema({
    title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  city: { type: String, required: true },
  type: { type: String, enum: ['single', 'shared', 'apartment', 'studio'], default: 'single' },
  photos: [{ type: String }],
  available: { type: Boolean, default: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contactPhone: { type: String, default: '' }
}, { timestamps: true 
})

const Room = mongoose.model('Room', roomSchema);
export {Room}