# Real-Time Chat App - Frontend

This is the React.js client application for the Real-Time Chat project, providing a dynamic and interactive user interface for real-time communication.

## ✨ Features
- **User Authentication**: Login and register with a username and password, or continue as a guest.
- **Chat Rooms**: View, create, and join multiple chat rooms.
- **Real-Time Messaging**: Send and receive messages instantly within selected rooms.
- **Online Users**: See a list of users currently online in the active room.
- **Typing Indicator**: Displays when other users are typing.
- **Chat History**: Loads previous messages when joining a room.
- **Responsive Design**: Adapts to various screen sizes.

## 🧰 Tech Stack
- **React.js**: Frontend library for building user interfaces.
- **Socket.io Client**: For real-time, bidirectional communication with the backend.
- **HTML/CSS**: For structuring and styling the application.

## 🚀 Getting Started
Follow these steps to set up and run the frontend application locally.

### Prerequisites
- **Node.js**: (LTS version recommended, e.g., v18.x or v20.x)
- **npm or Yarn**: Package managers (usually comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/21namanpandey/chat-room.git
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Configuration
The frontend is configured to connect to a backend server running on `http://localhost:3001`. If your backend is hosted elsewhere, you will need to update the `io()` connection URL in `src/components/ChatRoom.tsx` and the `fetch()` URLs in `src/components/Login.tsx` to point to your backend's address.

### Running the Application
To start the development server:
```bash
npm start
```

The application will typically open in your browser at `http://localhost:3000`.


## 🤝 Contributing
Feel free to open issues or pull requests.