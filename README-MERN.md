# Secret Game - MERN Stack 🎮

A full-stack secret number guessing game built with MongoDB, Express.js, React, and Node.js, featuring user authentication and game statistics tracking.

## 🚀 Features

- **User Authentication**: Secure registration and login system
- **Game Statistics**: Track games played, won, and best scores
- **Responsive Design**: Works on desktop and mobile devices
- **Multi-language Support**: Portuguese and English
- **Real-time Updates**: Game stats update automatically
- **Credits Modal**: Acknowledge contributors

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend

- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Context API** - State management

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd SecretGameNumber
```

### 2. Install dependencies

```bash
# Install backend dependencies
npm run install-server

# Install frontend dependencies
npm run install-client

# Or install all at once
npm run install-all
```

### 3. Environment Setup

```bash
# Copy environment example
cp .env.example .env

# Edit .env with your MongoDB URI and JWT secret
```

### 4. Start the application

**Option 1: Quick Start (Recommended)**

```bash
npm start
```

**Option 2: Development Mode**

```bash
# Development mode (runs both backend and frontend)
npm run dev

# Or run separately
npm run server  # Backend on port 8000
npm run client  # Frontend on port 3000
```

**🎮 No MongoDB? No Problem!**
The app will automatically detect if MongoDB is not available and allow users to play as guests. All game functionality works without a database - you just won't have user accounts or persistent statistics.

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database (Optional - leave empty to run without database features)
MONGODB_URI=mongodb://localhost:27017/secretgame

# JWT Secret (Required only if using authentication)
JWT_SECRET=your_jwt_secret_key_here

# Server Configuration
PORT=8000
NODE_ENV=development
```

**Note**: MongoDB is optional! If you don't have MongoDB installed, the app will still work - users can play as guests without authentication features.

## 📚 API Endpoints

### Authentication

- `POST /api/v1/users/register` - Register new user
- `POST /api/v1/users/login` - Login user
- `GET /api/v1/users/profile` - Get user profile (protected)
- `PUT /api/v1/users/game-stats` - Update game statistics (protected)

### Health Check

- `GET /api/v1/health` - API health check

## 🎯 How to Play

1. **Register/Login**: Create an account or sign in
2. **Guess the Number**: Try to guess the secret number between 1-10
3. **Get Hints**: The game will tell you if your guess is too high or low
4. **Track Progress**: Your game statistics are automatically saved
5. **Compete**: Try to beat your best score (fewest attempts)

## 🏗️ Project Structure

```
SecretGameNumber/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── .env.example
├── .gitignore
├── package.json
└── README-MERN.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **Adalberto Brant** - Project Maintainer
- **Open Source Community** - Contributors
- **Hacktoberfest 2025** - Participants

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Ensure MongoDB is running
   - Check your MONGODB_URI in .env

2. **Port Already in Use**

   - Change PORT in .env file
   - Kill existing processes on ports 3000/8000

3. **JWT Token Issues**
   - Clear localStorage in browser
   - Ensure JWT_SECRET is set in .env

### Development Tips

- Use `npm run dev` for hot reloading
- Check browser console for frontend errors
- Check terminal for backend errors
- Use MongoDB Compass to inspect database

## 🚀 Deployment

### Backend (Heroku/Railway/Render)

1. Set environment variables
2. Deploy backend code
3. Update frontend API base URL

### Frontend (Netlify/Vercel)

1. Build the React app (`npm run build`)
2. Deploy the build folder
3. Set up redirects for React Router

---

Made with ❤️ by the open source community
