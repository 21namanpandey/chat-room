import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import Message from './models/Message.js';
import Room from './models/Room.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: "*",
    // origin: process.env.FRONTEND_URL || "http://localhost:5173",/
    origin: [process.env.FRONTEND_URL,"http://localhost:5173", "http://10.0.2.2:3001","https://chatroomapp21.vercel.app"],

    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/messages', messageRoutes);

const activeUsers = {}; 
const typingUsersInRooms = {}; 

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join-room', async ({ roomId, username, userId }) => {
    socket.rooms.forEach(sRoomId => {
      if (sRoomId !== socket.id) {
        socket.leave(sRoomId);
        if (activeUsers[sRoomId]) {
          for (const uId in activeUsers[sRoomId]) {
            if (activeUsers[sRoomId][uId].socketId === socket.id) {
              const leftUsername = activeUsers[sRoomId][uId].username;
              delete activeUsers[sRoomId][uId];
              io.to(sRoomId).emit('online-users', Object.values(activeUsers[sRoomId]));
              io.to(sRoomId).emit('user-left', { username: leftUsername });
              console.log(`${leftUsername} left room ${sRoomId}`);
              break;
            }
          }
        }
        if (typingUsersInRooms[sRoomId]) {
          typingUsersInRooms[sRoomId] = typingUsersInRooms[sRoomId].filter(
            (u) => u !== username 
          );
          io.to(sRoomId).emit('typing', { typingUsers: typingUsersInRooms[sRoomId] });
        }
      }
    });

    socket.join(roomId);

    if (!activeUsers[roomId]) {
      activeUsers[roomId] = {};
    }
    activeUsers[roomId][userId] = { username, userId, socketId: socket.id };
    typingUsersInRooms[roomId] = typingUsersInRooms[roomId] || [];

    io.to(roomId).emit('online-users', Object.values(activeUsers[roomId]));
    io.to(roomId).emit('user-joined', { username });

    console.log(`${username} (ID: ${userId}, Socket: ${socket.id}) joined room ${roomId}`);
  });

  socket.on('chat-message', async ({ roomId, message, username, userId }) => {
    console.log(`Message in room ${roomId} from ${username}: ${message}`);
    const newMessage = new Message({
      roomId: new mongoose.Types.ObjectId(roomId),
      message,
      username,
      userId,
      timestamp: new Date()
    });

    try {
      await newMessage.save();
      io.to(roomId).emit('chat-message', newMessage);
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('typing', ({ roomId, username, isTyping }) => {
    if (!typingUsersInRooms[roomId]) {
      typingUsersInRooms[roomId] = [];
    }

    const currentTypingUsers = typingUsersInRooms[roomId];
    const userIndex = currentTypingUsers.indexOf(username);

    if (isTyping && userIndex === -1) {
      typingUsersInRooms[roomId].push(username);
    } else if (!isTyping && userIndex !== -1) {
      typingUsersInRooms[roomId].splice(userIndex, 1);
    }
    io.to(roomId).emit('typing', { typingUsers: typingUsersInRooms[roomId] });
  });

  socket.on('disconnecting', () => {
    socket.rooms.forEach(roomId => {
      if (roomId !== socket.id) { 
        if (activeUsers[roomId]) {
          for (const userId in activeUsers[roomId]) {
            if (activeUsers[roomId][userId].socketId === socket.id) {
              const username = activeUsers[roomId][userId].username;
              delete activeUsers[roomId][userId];
              io.to(roomId).emit('online-users', Object.values(activeUsers[roomId]));
              io.to(roomId).emit('user-left', { username });
              console.log(`${username} left room ${roomId} due to disconnect`);

              if (typingUsersInRooms[roomId]) {
                typingUsersInRooms[roomId] = typingUsersInRooms[roomId].filter(
                  (u) => u !== username
                );
                io.to(roomId).emit('typing', { typingUsers: typingUsersInRooms[roomId] });
              }
              break;
            }
          }
        }
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await mongoose.connection.close();
  console.log('MongoDB connection closed.');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});