# Real-Time Chat Application 💬

This project delivers a full-stack real-time chat application built with a Node.js backend (Express, Socket.io, MongoDB) and a React.js frontend. It empowers users to connect, register, log in, join various chat rooms, exchange instant messages, monitor online presence, and view typing indicators.

## 🎯 Project Overview
The primary goal of this project is to showcase a robust and interactive real-time chat solution. The backend efficiently manages user authentication, ensures data persistence, and facilitates real-time event broadcasting, while the frontend offers an intuitive, responsive, and engaging user experience.

## ✨ Key Features
### User Authentication & Access
- Seamless user registration requiring a mandatory username and password for secure access.
- Secure login for existing users.
- Convenient option to continue as a guest, bypassing traditional registration/login.

### Dynamic Real-Time Chat
- Ability to join specific chat rooms for focused conversations.
- Instantaneous sending and receiving of messages, ensuring real-time interaction.
- Messages are efficiently broadcast to all participants within the same room.
- Clear display of sender's username and message timestamp for context.

### Flexible Chat Rooms
- Users can dynamically create new chat rooms to organize discussions.
- Effortlessly switch between multiple independent chat rooms.

### Live Online Presence
- A real-time list displays users currently active and online in the selected room.

### Intuitive Typing Indicator
- A "User is typing..." notification provides immediate feedback when others are composing messages.

### Persistent Chat History
- All messages are reliably stored in a MongoDB database.
- Previous messages are automatically loaded upon joining any chat room, ensuring continuity.

## 🧰 Tech Stack
### Backend (Node.js)
- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
- **Socket.io**: Enables real-time, bidirectional, event-based communication.
- **MongoDB**: A flexible NoSQL document database for scalable data storage.
- **Mongoose**: An elegant MongoDB object modeling for Node.js, simplifying data interactions.
- **bcryptjs**: Used for securely hashing and comparing user passwords.
- **jsonwebtoken (JWT)**: For creating and verifying secure authentication tokens.
- **express-validator**: A set of Express.js middlewares for robust server-side data validation and sanitization.
- **dotenv**: Loads environment variables from a `.env` file, keeping sensitive information out of the codebase.
- **cors**: Express middleware to enable Cross-Origin Resource Sharing (CORS), allowing frontend and backend to communicate across different domains/ports.

### Frontend (Web - React.js)
- **React.js**: A declarative, efficient, and flexible JavaScript library for building user interfaces.
- **Socket.io Client**: The client-side library for establishing real-time connections with the Socket.io backend.
- **HTML / CSS**: The foundational languages for structuring web content and styling its presentation.

## 📂 Project Structure
The project is logically organized into two distinct main directories:

```
chat-app/
├── chat-frontend/         # 🚀 React.js client application
│   ├── public/            # Static assets
│   ├── src/               # React source code
│   │   ├── components/    # Reusable UI components
│   │   ├── App.tsx        # Main application component
│   │   └── index.tsx      # Entry point for React app
│   ├── package.json       # Frontend dependencies and scripts
│   └── README.md          # Frontend specific documentation
└── chat-backend/          # ⚙️ Node.js Express server
    ├── config/            # Database connection configuration (e.g., `db.js`)
    ├── middleware/        # Custom Express middleware (e.g., `auth.js`)
    ├── models/            # Mongoose schemas for data models (User, Room, Message)
    ├── controllers/       # Business logic for API endpoints
    ├── routes/            # API route definitions (e.g., `authRoutes.js`)
    ├── server.js          # Main entry point for the backend server
    ├── package.json       # Backend dependencies and scripts
    ├── .env               # Environment variables (sensitive data)
    └── README.md          # Backend specific documentation
```

## 🚀 Getting Started
Follow these steps to get the entire chat application up and running on your local machine.

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js**: (LTS version recommended, e.g., v18.x or v20.x)
- **npm or Yarn**: Package managers (usually comes with Node.js)
- **MongoDB**: A running instance of the MongoDB database. You can install it locally or use a cloud service like MongoDB Atlas.

### 1. Backend Setup
First, set up and start the backend server.

**Navigate to the backend directory:**
```bash
cd backend
```

**Install backend dependencies:**
```bash
npm install
```

**Create a `.env` file:** In the root of the `chat-backend` directory, create a file named `.env` and add the following crucial environment variables. Remember to replace placeholder values.

```
MONGO_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_super_secret_jwt_key_please_change_this_to_a_long_random_string
PORT=3001
```

- **MONGO_URI**: Your MongoDB connection string. Adjust if your MongoDB instance is not running locally on the default port or has different credentials.
- **JWT_SECRET**: 🚨 **IMPORTANT**: Replace this placeholder with a strong, random, and unique string. This is vital for the security of your JSON Web Tokens.
- **PORT**: The port on which your backend server will listen for requests.

**Start the backend server:**
```bash
npm start
# For development with automatic restarts on file changes (recommended):
npm run dev
```

The backend server should now be running and accessible at `http://localhost:3001`. Confirm by checking your terminal for "MongoDB Connected..." and "Server running on port 3001".

### 2. Frontend Setup
Next, set up and run the frontend React application.

**Navigate to the frontend directory:** Open a new terminal tab or window and navigate to the frontend folder:
```bash
cd ../frontend # If you're currently in chat-backend
# OR if starting from the main 'chat-app' directory:
# cd chat-frontend
```

**Install frontend dependencies:**
```bash
npm install
```

**Start the frontend application:**
```bash
npm start
```

The frontend application will typically open in your default browser at `http://localhost:3000`.

## 📈 How to Use the Application
1. **Access the App**: Open your web browser and navigate to `http://localhost:3000`.
2. **Authentication**:
   - **Register**: Create a new user account by providing a unique username and a mandatory password.
   - **Login**: If you already have an account, use your credentials to log in.
   - **Guest Access**: For quick access, click "Continue as Guest" to join the chat without needing to register or log in.
3. **Explore Rooms**: Once logged in, you will see a sidebar displaying available chat rooms.
4. **Create/Join Rooms**:
   - Click the `+` button in the sidebar to create a new chat room.
   - Click on an existing room name in the sidebar to join it.
5. **Start Chatting!** Begin typing your messages in the input field at the bottom of the chat area. Messages will appear in real-time for all users in the same room.

## 🤝 Contributing
Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please feel free to:
- Open an issue to discuss your ideas or report bugs.
- Fork the repository and submit a pull request with your changes.

## 📄 License
This project is open-source and available under the MIT License.