import { Inquiry } from '../models/inquiryModel.js';

const createInquiry = async (req, res) => {
  try {
    const { roomId, message } = req.body;
    
    
    const existing = await Inquiry.findOne({
      room: roomId,
      renter: req.user.userId
    });
    
    if (existing) {
      return res.status(400).json({ message: 'You already expressed interest in this room' });
    }

    const inquiry = await Inquiry.create({
      room: roomId,
      renter: req.user.userId,
      message
    });

    return res.status(201).json({ message: 'Interest submitted!', inquiry });
  } catch (e) {
    return res.status(500).json({ message: `Error: ${e}` });
  }
};


const getInquiries = async (req, res) => {
  try {
    const { roomId } = req.params;
    
    const inquiries = await Inquiry.find({ room: roomId })
      .populate('renter', 'name email')
      .sort({ createdAt: -1 });

    return res.status(200).json(inquiries);
  } catch (e) {
    return res.status(500).json({ message: `Error: ${e}` });
  }
};


const updateInquiryStatus = async (req, res) => {
  try {
    const { inquiryId } = req.params;
    const { status } = req.body;

    const inquiry = await Inquiry.findByIdAndUpdate(
      inquiryId,
      { status },
      { new: true }
    ).populate('renter', 'name email');

    return res.status(200).json({ message: 'Status updated', inquiry });
  } catch (e) {
    return res.status(500).json({ message: `Error: ${e}` });
  }
};

export { createInquiry, getInquiries, updateInquiryStatus };