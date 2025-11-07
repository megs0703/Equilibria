# Equilibria Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Expo CLI (for mobile): `npm install -g @expo/cli`

## 1. Backend Setup

```bash
cd backend
npm install
```

### Environment Configuration
Update `.env` file with your values:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/equilibria?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Start Backend Server
```bash
npm run dev
```
Server will run on http://localhost:5000

## 2. Frontend Setup

```bash
cd frontend
npm install
```

### Environment Configuration
Update `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Start Frontend
```bash
npm start
```
App will run on http://localhost:3000

## 3. Mobile App Setup

```bash
cd mobile
npm install
```

### Start Mobile App
```bash
npx expo start
```

Use Expo Go app on your phone to scan QR code, or run on simulator.

## 4. MongoDB Setup Options

### Option A: MongoDB Atlas (Recommended)
1. Go to https://www.mongodb.com/atlas
2. Create free account
3. Create cluster
4. Setup database user
5. Whitelist IP addresses
6. Get connection string
7. Update MONGODB_URI in backend/.env

### Option B: Local MongoDB
1. Download MongoDB Community Server
2. Install and start MongoDB service
3. Use default connection: `mongodb://localhost:27017/equilibria`

## 5. Testing the Application

1. **Backend**: Visit http://localhost:5000/api/auth/me (should return 401)
2. **Frontend**: Visit http://localhost:3000 (should show login page)
3. **Mobile**: Scan QR code with Expo Go app

## 6. Key Features Implemented

### ✅ Core Features
- User authentication (JWT)
- Gender-based personalization
- Workout management (gym/home toggle)
- Nutrition tracking with macros
- Water intake monitoring
- Personalized dashboard

### ✅ AI/ML Features
- Personalized workout recommendations
- Smart nutrition suggestions
- BMR/TDEE calculations
- Goal-based meal planning

### ✅ Event-Driven Features
- Real-time notifications
- Progress tracking events
- Reminder system
- Goal achievement alerts

### ✅ Mobile Support
- React Native app with Expo
- Cross-platform (iOS/Android)
- Native navigation
- Responsive design

## 7. Architecture Overview

```
Equilibria/
├── backend/           # Node.js/Express API
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API endpoints
│   ├── middleware/    # Auth & validation
│   ├── utils/         # AI recommendations & events
│   └── server.js      # Main server
├── frontend/          # React.js web app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/   # State management
│   │   └── utils/     # API calls
└── mobile/            # React Native app
    ├── src/
    │   ├── screens/
    │   ├── context/
    │   └── utils/
```

## 8. Next Steps

1. **Setup MongoDB** (Atlas recommended)
2. **Update environment variables**
3. **Install dependencies** for all three apps
4. **Start all services** (backend, frontend, mobile)
5. **Test registration/login flow**
6. **Explore personalized features**

## 9. Troubleshooting

### Common Issues:
- **CORS errors**: Check API_URL in frontend .env
- **MongoDB connection**: Verify connection string and network access
- **Mobile app not loading**: Ensure backend is running and accessible
- **JWT errors**: Check JWT_SECRET in backend .env

### Support:
- Check console logs for detailed error messages
- Verify all environment variables are set
- Ensure MongoDB is running and accessible
- Test API endpoints with Postman/curl

## 10. Production Deployment

### Backend:
- Deploy to Heroku, AWS, or DigitalOcean
- Use MongoDB Atlas for database
- Set production environment variables

### Frontend:
- Deploy to Vercel, Netlify, or AWS S3
- Update API_URL to production backend

### Mobile:
- Build with `expo build`
- Submit to App Store/Google Play
- Configure production API endpoints

The application is now ready for development and testing! 🚀