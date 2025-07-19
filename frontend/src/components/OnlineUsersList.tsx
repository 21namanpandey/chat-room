import React from 'react';
import './OnlineUsersList.css';

interface OnlineUser {
  username: string;
  userId: string; 
}

interface OnlineUsersListProps {
  users: OnlineUser[];
  onClose: () => void;
}

const OnlineUsersList: React.FC<OnlineUsersListProps> = ({ users, onClose }) => {
  const getAvatarColor = (username: string) => {
    const colors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6f42c1', '#e83e8c', '#fd7e14'];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="online-users-panel">
      <div className="panel-header">
        <h3>👥 Online Users ({users.length})</h3>
        <button className="close-button" onClick={onClose} title="Close">×</button>
      </div>
      
      <div className="users-list">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.userId} className="user-item"> 
              <div 
                className="user-avatar"
                style={{ backgroundColor: getAvatarColor(user.username) }}
              >
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span className="user-name">{user.username}</span>
              <div className="online-indicator" title="Online"></div>
            </div>
          ))
        ) : (
          <div className="no-users">
            <div className="empty-state">
              <span className="empty-icon">👤</span>
              <p>No users online</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnlineUsersList;