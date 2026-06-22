import { Room } from "../models/room.js";

// CREATE - owner posts a room
const createRoom = async (req, res) => {
  try {
    const { title, description, price, city, type,  contactPhone, photos } = req.body;

    const room = await Room.create({
      title,
      description,
      price,
      city,
      type,
      contactPhone,
      photos,
      owner: req.user.userId  
    });

    return res.status(201).json({ message: 'Room created successfully', room });

  } catch (e) {
    return res.status(500).json({ message: `Something went wrong ${e}` });
  }
};

// READ - get all rooms with search and filter
const getAllRooms = async (req, res) => {
  try {
    const { city, type, minPrice, maxPrice } = req.query;

    let filter = { available: true };

    if (city) filter.city = { $regex: city, $options: 'i' }; // case insensitive search
    if (type) filter.type = type;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const rooms = await Room.find(filter)
      .populate('owner', 'name email ') // get owner details
      .sort({ createdAt: -1 }); // newest first

    return res.status(200).json(rooms);

  } catch (e) {
    return res.status(500).json({ message: `Something went wrong ${e}` });
  }
};

// READ - get single room
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate('owner', 'name email ');

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    return res.status(200).json(room);

  } catch (e) {
    return res.status(500).json({ message: `Something went wrong ${e}` });
  }
};

// UPDATE - owner edits their room
const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // check if this owner owns this room
    if (room.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only edit your own rooms' });
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated room
    );

    return res.status(200).json({ message: 'Room updated', room: updatedRoom });

  } catch (e) {
    return res.status(500).json({ message: `Something went wrong ${e}` });
  }
};

// DELETE - owner deletes their room
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // check if this owner owns this room
    if (room.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only delete your own rooms' });
    }

    await Room.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: 'Room deleted successfully' });

  } catch (e) {
    return res.status(500).json({ message: `Something went wrong ${e}` });
  }
}
export  { createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom };