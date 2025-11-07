# Equilibria - Fitness & Nutrition Tracking Application

A comprehensive full-stack fitness and nutrition application that provides personalized workout plans, nutritional guidance, and tracking features with a focus on inclusivity and accessibility.

## Features

### Core Features
- **User Authentication**: Secure JWT-based authentication with registration and login
- **Personalized Dashboard**: Gender-based personalization with tailored recommendations
- **Workout Management**: Support for both gym and home workouts with AI-powered exercise suggestions
- **Nutrition Tracking**: Meal logging with calorie and macro tracking, smart meal recommendations
- **Water Intake Tracking**: Daily hydration monitoring with progress visualization and reminders
- **Progress Analytics**: Body measurements, weight tracking, mood and energy logging with trend analysis
- **Social Community**: Share progress, motivate others, like and comment on posts
- **Mobile App**: Cross-platform React Native app with push notifications
- **Accessibility**: WCAG 2.1 compliant design with screen reader support
- **Responsive Design**: Mobile-first approach with seamless tablet and desktop experiences

### User Types
- **Home Users**: Dynamic workout suggestions for home-based exercises
- **Gym Users**: Upload and manage gym workout plans
- **Seamless Switching**: Toggle between home and gym modes

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Joi** for input validation
- **Helmet** for security headers
- **Rate limiting** for API protection

### Frontend
- **React.js** with hooks
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Heroicons** for icons
- **Axios** for API calls
- **Chart.js** for progress visualization

### Mobile
- **React Native** with Expo
- **AsyncStorage** for offline data
- **Expo Notifications** for push notifications
- **React Navigation** for mobile navigation

## Project Structure

```
Equilibria/
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication & validation
│   ├── utils/           # Utility functions
│   └── server.js        # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context
│   │   ├── utils/       # API utilities
│   │   └── hooks/       # Custom hooks
└── mobile/              # React Native app
    ├── src/
    │   ├── screens/     # Mobile screens
    │   ├── context/     # Mobile state management
    │   └── utils/       # Mobile API & notifications
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/equilibria
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### User Management
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/preferences` - Update user preferences
- `GET /api/user/protein-recommendation` - Get protein recommendations

### Workouts
- `POST /api/workout` - Create workout plan
- `GET /api/workout` - Get user's workout plans
- `GET /api/workout/suggestions` - Get workout suggestions

### Nutrition
- `POST /api/nutrition/meal` - Add meal to log
- `GET /api/nutrition/today` - Get today's nutrition log
- `GET /api/nutrition/history` - Get nutrition history
- `GET /api/nutrition/suggestions` - Get meal suggestions

### Water Tracking
- `POST /api/water/add` - Add water intake
- `GET /api/water/today` - Get today's water log
- `GET /api/water/history` - Get water intake history

### Progress Tracking
- `POST /api/progress` - Log progress entry
- `GET /api/progress` - Get progress history
- `GET /api/progress/analytics` - Get progress analytics

### Social Features
- `POST /api/social/posts` - Create post
- `GET /api/social/feed` - Get community feed
- `POST /api/social/posts/:id/like` - Like/unlike post
- `POST /api/social/posts/:id/comment` - Add comment

## Database Models

### User Model
- Personal information (name, email, age, gender, height, weight)
- Fitness goals and injuries
- User preferences and role
- Authentication fields

### WorkoutPlan Model
- Exercise details (name, sets, reps, weight)
- Workout type (gym/home) and goals
- Target muscles and equipment

### NutritionLog Model
- Daily meal tracking (breakfast, lunch, dinner, snacks)
- Macro and calorie calculations
- Junk food tracking

### WaterLog Model
- Daily water intake tracking
- Goal setting and progress monitoring
- Timestamped intake records

### ProgressLog Model
- Body measurements and weight tracking
- Progress photos and notes
- Mood and energy level logging
- Trend analysis and analytics

### Post Model
- Social posts with content and images
- Like and comment system
- Community engagement features

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Rate limiting
- CORS protection
- Security headers with Helmet

## Accessibility Features

- WCAG 2.1 compliant design
- Screen reader support
- High contrast mode support
- Keyboard navigation
- Semantic HTML structure
- ARIA labels and descriptions

## Gender-Based Personalization

### Male Users
- Emphasis on strength training
- Higher protein recommendations
- Muscle-building focused suggestions

### Female Users
- Flexibility and hormonal considerations
- Balanced strength and cardio
- Wellness-focused recommendations

### Other/Custom
- Fully customizable preferences
- Neutral recommendations
- User-defined goals priority

## Advanced Features Implemented

### AI/ML Powered Recommendations
- Personalized workout suggestions based on user profile, goals, and limitations
- Smart nutrition planning with BMR/TDEE calculations
- Adaptive meal recommendations considering gender and fitness goals
- Intelligent water intake suggestions based on body weight and activity

### Event-Driven Architecture
- Real-time progress tracking and notifications
- Automated reminder system for water and workouts
- Goal achievement celebrations
- User activity logging and analytics

### Social Community Platform
- Share workout achievements and progress photos
- Community feed with likes and comments
- Motivational posts and success stories
- Gender-specific community groups

### Advanced Analytics
- Progress trend analysis with charts
- Body composition tracking
- Mood and energy correlation analysis
- Personalized insights and recommendations

## Future Enhancements

- Third-party API integrations (Nutritionix, ExerciseDB)
- Wearable device integration (Apple Health, Google Fit)
- Video workout streaming
- Nutrition barcode scanning
- Advanced machine learning models
- Telehealth integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 