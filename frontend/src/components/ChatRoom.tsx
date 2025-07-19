import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import RoomSidebar from './RoomSidebar';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import OnlineUsersList from './OnlineUsersList';
import TypingIndicator from './TypingIndicator';
import './ChatRoom.css';

interface User {
  userId: string; 
  username: string;
  token: string;
}

interface Room {
  _id: string; 
  name: string;
  createdAt: string; 
}

interface Message {
  _id: string; 
  roomId: string;
  message: string;
  username: string;
  userId: string;
  timestamp: string;
}

interface OnlineUser {
  username: string;
  userId: string; 
  socketId?: string; 
}

interface ChatRoomProps {
  user: User;
  onLogout: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ user, onLogout }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [showUsersList, setShowUsersList] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const newSocket = io('https://chat-room-mgd8.onrender.com');
    // const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setConnectionStatus('connected');
      console.log('Connected to server');
    });

    newSocket.on('disconnect', () => {
      setConnectionStatus('disconnected');
      console.log('Disconnected from server');
    });

    newSocket.on('connect_error', (err) => {
      setConnectionStatus('disconnected');
      console.error('Connection error:', err.message);
    });

    loadRooms();

    newSocket.on('chat-message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('online-users', (users: OnlineUser[]) => {
      setOnlineUsers(users);
    });

    newSocket.on('typing', ({ typingUsers }: { typingUsers: string[] }) => {
      setTypingUsers(typingUsers.filter(username => username !== user.username));
    });

    newSocket.on('user-joined', ({ username }: { username: string }) => {
      console.log(`${username} joined the room`);
    });

    newSocket.on('user-left', ({ username }: { username: string }) => {
      console.log(`${username} left the room`);
    });

    return () => {
      newSocket.close();
    };
  }, [user.username]); 

  const loadRooms = async () => {
    try {
      // const response = await fetch('http://localhost:3001/api/rooms');
      const response = await fetch('https://chat-room-mgd8.onrender.com/api/rooms');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const roomsData: Room[] = await response.json();
      setRooms(roomsData);

      if (roomsData.length > 0 && !currentRoom) {
        joinRoom(roomsData[0]);
      }
    } catch (error) {
      console.error('Error loading rooms:', error);
    }
  };

  const joinRoom = async (room: Room) => {
    if (!socket) return;

    if (currentRoom?._id === room._id) return;

    setCurrentRoom(room);
    setMessages([]); 
    setOnlineUsers([]); 
    setTypingUsers([]);

    socket.emit('join-room', {
      roomId: room._id, 
      username: user.username,
      userId: user.userId 
    });

    try {
      const response = await fetch(`https://chat-room-mgd8.onrender.com/api/messages/${room._id}`);
      // const response = await fetch(`http://localhost:3001/api/messages/${room._id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const messagesData: Message[] = await response.json();
      setMessages(messagesData);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = (message: string) => {
    if (!socket || !currentRoom || !message.trim()) return;

    socket.emit('chat-message', {
      roomId: currentRoom._id, 
      message: message.trim(),
      username: user.username,
      userId: user.userId 
    });
  };

  const handleTyping = (isTyping: boolean) => {
    if (!socket || !currentRoom) return;

    if (isTyping) {
      socket.emit('typing', {
        roomId: currentRoom._id, 
        username: user.username,
        isTyping: true
      });

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('typing', {
          roomId: currentRoom._id, 
          username: user.username,
          isTyping: false
        });
        typingTimeoutRef.current = null; 
      }, 2000); 
    } else {
      socket.emit('typing', {
        roomId: currentRoom._id, 
        username: user.username,
        isTyping: false
      });

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    }
  };

  const createRoom = async (roomName: string) => {
    try {
      // const response = await fetch('http://localhost:3001/api/rooms', {
      const response = await fetch('https://chat-room-mgd8.onrender.com/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: roomName }),
      });

      if (response.ok) {
        const newRoom: Room = await response.json();
        setRooms(prev => [...prev, newRoom]);
        joinRoom(newRoom);
      } else {
        const errorData = await response.json();
        console.error('Error creating room:', errorData.error || 'Unknown error');
        alert(`Failed to create room: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Connection error when trying to create room.');
    }
  };

  return (
    <div className="chat-container">
      <RoomSidebar
        rooms={rooms}
        currentRoom={currentRoom}
        onRoomSelect={joinRoom}
        onCreateRoom={createRoom}
        user={user}
        onLogout={onLogout}
        connectionStatus={connectionStatus}
      />
      
      <div className="chat-main">
        <div className="chat-header">
          <div className="room-info">
            <h2>{currentRoom?.name || 'Select a room'}</h2>
            <div className={`connection-status ${connectionStatus}`}>
              <span className="status-dot"></span>
              {connectionStatus === 'connected' ? 'Connected' : 
               connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
            </div>
          </div>
          <div>
            <button 
            className="users-toggle"
            onClick={() => setShowUsersList(!showUsersList)}
          >
            👥 Online ({onlineUsers.length}) 
          </button>
          </div>
        </div>

        <div className="chat-body">
          <div className="messages-container">
            <MessageList messages={messages} currentUser={user} />
            <TypingIndicator typingUsers={typingUsers} />
          </div>
          
          {showUsersList && (
            <OnlineUsersList 
              users={onlineUsers} 
              onClose={() => setShowUsersList(false)} 
            />
          )}
        </div>

        <MessageInput 
          onSendMessage={sendMessage}
          onTyping={handleTyping}
          disabled={!currentRoom || connectionStatus !== 'connected'}
        />
      </div>
    </div>
  );
};

export default ChatRoom;