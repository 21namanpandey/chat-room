import express from 'express';
import { getRoomMessages } from '../controllers/messageController.js';

const router = express.Router();

router.get('/:roomId', getRoomMessages);

export default router;