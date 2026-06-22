import { Router } from 'express';
import { createInquiry, getInquiries, updateInquiryStatus } from '../controllers/inquiryController.js';
import { protect, ownerOnly } from '../middlewares/verifyToken.js';

const router = Router();

// Renter expresses interest
router.post('/', protect, createInquiry);

// Owner views inquiries for their room
router.get('/:roomId', protect, ownerOnly, getInquiries);

// Owner updates inquiry status
router.put('/:inquiryId', protect, ownerOnly, updateInquiryStatus);

export default router;