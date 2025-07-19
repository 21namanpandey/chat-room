import Message from '../models/Message.js';
import mongoose from 'mongoose';

export const getRoomMessages = async (req, res) => {
  const { roomId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    return res.status(400).json({ error: 'Invalid room ID' });
  }

  try {
    const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};