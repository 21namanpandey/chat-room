# Real-Time Chat App - Backend

This is the Node.js (Express) backend for the Real-Time Chat project, handling user authentication, chat room management, message persistence, and real-time communication via Socket.io.

## ✨ Features

### User Authentication
- Register new users with a username and a mandatory password.
- Login existing users with username and password.
- Generates JWTs for authenticated sessions.

### Chat Room Management
- API to fetch all available chat rooms.
- API to create new chat rooms.

### Message Persistence
- Stores chat messages in a MongoDB database.

### Real-Time Communication
- Socket.io integration for instant message delivery.
- Broadcasts online user lists per room.
- Handles typing indicators.

### Robust Validation
- Uses express-validator for server-side input validation.

## 🧰 Tech Stack
- **Node.js**: JavaScript runtime.
- **Express.js**: Web application framework for Node.js.
- **Socket.io**: Real-time engine for bidirectional communication.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **bcryptjs**: For hashing passwords securely.
- **jsonwebtoken**: For implementing JSON Web Tokens (JWT) for authentication.
- **dotenv**: For loading environment variables.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **express-validator**: For robust server-side input validation.

## 🚀 Getting Started

Follow these steps to set up and run the backend application locally.

### Prerequisites
- Node.js (LTS version recommended)
- npm or Yarn
- MongoDB (running instance)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/21namanpandey/chat-room.git
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Configuration (.env file)
Create a `.env` file in the root of the `chat-backend` directory and add the following environment variables:

```
MONGO_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_super_secret_jwt_key_please_change_this
PORT=3001
```

- **MONGO_URI**: Your MongoDB connection string. If MongoDB is running locally on the default port, the provided URI should work. Otherwise, update it.
- **JWT_SECRET**: **IMPORTANT**: Replace `your_super_secret_jwt_key_please_change_this` with a strong, random, and unique string. This is crucial for the security of your JWTs.
- **PORT**: The port on which the backend server will run.

### Running the Application
To start the backend server:
```bash
npm start
# For development with auto-restarts on file changes:
npm run dev
```

The server will typically run on `http://localhost:3001`.

## 🌐 API Endpoints
- **POST /api/auth/register**: Register a new user.
  - Body: `{ username, password }`
- **POST /api/auth/login**: Authenticate a user.
  - Body: `{ username, password }`
- **GET /api/rooms**: Get a list of all chat rooms.
- **POST /api/rooms**: Create a new chat room.
  - Body: `{ name }`
- **GET /api/messages/:roomId**: Get chat history for a specific room.

## 🔌 Socket.io Events
- **emit: 'join-room'**: Sent by client to join a room.
  - Payload: `{ roomId, username, userId }`
- **emit: 'chat-message'**: Sent by client to send a message.
  - Payload: `{ roomId, message, username, userId }`
- **emit: 'typing'**: Sent by client to indicate typing status.
  - Payload: `{ roomId, username, isTyping }`
- **on: 'chat-message'**: Received by client when a new message is sent in the room.
  - Payload: `{ _id, roomId, message, username, userId, timestamp }`
- **on: 'online-users'**: Received by client with the updated list of online users in the room.
  - Payload: `[{ username, userId, socketId }]`
- **on: 'typing'**: Received by client with the list of users currently typing in the room.
  - Payload: `{ typingUsers: string[] }`
- **on: 'user-joined'**: Received by client when a user joins the room.
  - Payload: `{ username }`
- **on: 'user-left'**: Received by client when a user leaves the room.
  - Payload: `{ username }`

## 🤝 Contributing
Feel free to open issues or pull requests.