import React, { useState } from 'react';
import './Login.css';

interface LoginProps {
  onLogin: (user: { userId: string; username: string; token: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin({ userId: data.userId, username: data.username, token: data.token });
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (error) {
      setError('Connection error. Please make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    const guestUsername = `Guest${Math.floor(Math.random() * 100000)}`;
    onLogin({
      userId: `guest-${Date.now()}`,
      username: guestUsername,
      token: 'guest-token'
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>💬 Real-Time Chat</h1>
          <p>Connect and chat with people around the world</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              disabled={loading}
              maxLength={20}
              required 
            />
          </div>

          <div className="form-group"> 
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
              required 
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'Loading...' : isRegister ? 'Register' : 'Login'}
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError(''); 
              setPassword(''); 
            }}
            disabled={loading}
          >
            {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
          </button>

          <button
            type="button"
            className="guest-button"
            onClick={handleGuestLogin}
            disabled={loading}
          >
            Continue as Guest
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;