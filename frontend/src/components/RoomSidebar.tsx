import React, { useState } from 'react';
import './RoomSidebar.css';

interface Room {
  _id: string; 
  name: string;
  createdAt: string;
}

interface User {
  userId: string; 
  username: string;
  token: string;
}

interface RoomSidebarProps {
  rooms: Room[];
  currentRoom: Room | null;
  onRoomSelect: (room: Room) => void;
  onCreateRoom: (name: string) => void;
  user: User;
  onLogout: () => void;
  connectionStatus: 'connecting' | 'connected' | 'disconnected';
}

const RoomSidebar: React.FC<RoomSidebarProps> = ({
  rooms,
  currentRoom,
  onRoomSelect,
  onCreateRoom,
  user,
  onLogout,
  connectionStatus
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoomName.trim() && newRoomName.trim().length <= 30) {
      onCreateRoom(newRoomName.trim());
      setNewRoomName('');
      setShowCreateForm(false);
    }
  };

  return (
    <div className="room-sidebar">
      <div className="sidebar-header">
        <h3>💬 Chat Rooms</h3>
        <button 
          className="create-room-btn"
          onClick={() => setShowCreateForm(true)}
          title="Create new room"
        >
          +
        </button>
      </div>

      {showCreateForm && (
        <form onSubmit={handleCreateRoom} className="create-room-form">
          <input
            type="text"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            placeholder="Room name..."
            autoFocus
            maxLength={30}
          />
          <div className="form-actions">
            <button type="submit" disabled={!newRoomName.trim()}>Create</button>
            <button 
              type="button" 
              onClick={() => {
                setShowCreateForm(false);
                setNewRoomName('');
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="rooms-list">
        {rooms.map((room) => (
          <div
            key={room._id} 
            className={`room-item ${currentRoom?._id === room._id ? 'active' : ''}`} 
            onClick={() => onRoomSelect(room)}
          >
            <span className="room-name">#{room.name}</span>
          </div>
        ))}
        {rooms.length === 0 && (
          <div className="no-rooms">No rooms available</div>
        )}
      </div>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-details">
            <div className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="user-text">
              <span className="username">{user.username}</span>
              <span className={`status ${connectionStatus}`}>
                {connectionStatus === 'connected' ? '🟢 Online' : 
                connectionStatus === 'connecting' ? '🟡 Connecting' : '🔴 Offline'}
              </span>
            </div>
          </div>
          <button className="logout-btn" onClick={onLogout} title="Logout">
            ⏻
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomSidebar;