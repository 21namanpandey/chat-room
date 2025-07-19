import Room from '../models/Room.js';

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: 1 });
    res.json(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const createRoom = async (req, res) => {
  const { name } = req.body;

  try {
    let room = await Room.findOne({ name });
    if (room) {
      return res.status(400).json({ error: 'Room with this name already exists' });
    }

    room = new Room({ name });
    await room.save();
    res.status(201).json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};