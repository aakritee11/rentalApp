import {Router} from "express"
import{ createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom } from '../controllers/roomController.js';
import{ protect, ownerOnly } from '../middlewares/verifyToken.js';

const router = Router();

router.get('/', getAllRooms);                              // public
router.get('/:id', getRoomById);                          // public
router.post('/', protect, ownerOnly, createRoom);         // owners only
router.put('/:id', protect, ownerOnly, updateRoom);       // owners only
router.delete('/:id', protect, ownerOnly, deleteRoom);    // owners only

export default router;