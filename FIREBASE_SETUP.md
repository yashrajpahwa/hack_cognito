# Firebase Authentication Setup Guide

## Overview
This app uses Firebase Authentication with:
- Google OAuth Sign-in
- Email/Password Authentication
- Zustand for state management
- Protected routes with react-router-dom

## Setup Instructions

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add Project**
3. Enter your project name (e.g., 'valuechain-app')
4. Disable Google Analytics (optional)
5. Click **Create Project**

### 2. Enable Authentication Methods

1. In your Firebase project, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password**:
   - Click on Email/Password
   - Toggle Enable
   - Click Save
3. Enable **Google**:
   - Click on Google
   - Toggle Enable
   - Enter your project support email
   - Click Save

### 3. Register Your Web App

1. In Firebase Console, go to **Project Settings** (click gear icon)
2. Under **Your apps**, click the **Web** icon (</>)
3. Register your app with a nickname (e.g., 'ValueChain Web')
4. Click **Register app**
5. Copy the firebaseConfig object

### 4. Configure Environment Variables

1. Copy .env.local.example to .env.local:
   ```
   cp .env.local.example .env.local
   ```

2. Edit .env.local and replace with your Firebase config values:
   ```
   VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
   ```

### 5. Configure Authorized Domains (for Google Sign-in)

1. In Firebase Console, go to **Authentication** > **Settings** > **Authorized domains**
2. Add your local development domain if needed:
   - localhost (should be there by default)
3. For production, add your deployed domain

### 6. Restart Development Server

After adding your Firebase credentials:

```bash
npm run dev
```

## Features Implemented

### Authentication Components

- **Login.jsx**: Full-featured login page with:
  - Email/Password sign-up and sign-in
  - Google OAuth integration
  - Error handling with user-friendly messages
  - Loading states
  - Form validation

- **ProtectedRoute.jsx**: Route guard component that:
  - Checks authentication status
  - Shows loading state while checking auth
  - Redirects to /login if not authenticated

- **authStore.js**: Zustand store managing:
  - User state
  - Loading state
  - Login/Logout actions

### Updated Components

- **App.jsx**: 
  - Firebase auth state listener
  - Protected routes wrapper
  - Logout functionality
  - User profile display in header
  - Automatic redirect to /login for unauthenticated users

### Routes

- /login - Public route (redirects to / if already logged in)
- /* - All other routes protected by ProtectedRoute

### State Management

Using **Zustand** for clean, simple state management:

```javascript
import { useAuthStore } from './authStore';

// In any component
const { user, loading } = useAuthStore();
```

## Security Notes

1. **Never commit .env.local** to version control
2. .env.local is already in .gitignore
3. Use environment variables for all sensitive Firebase config
4. Firebase security rules should be configured in Firebase Console

## Testing Authentication

1. Start your dev server: 
pm run dev
2. Navigate to http://localhost:3000
3. You should be redirected to /login
4. Test Email/Password:
   - Click "Don't have an account? Sign up"
   - Enter email and password (min 6 characters)
   - Click Sign Up
5. Test Google Sign-in:
   - Click "Sign in with Google"
   - Select your Google account
   - Grant permissions

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Check that Firebase config is correct in .env.local
- Restart your dev server after adding env variables

### "Firebase: Error (auth/unauthorized-domain)"
- Add your domain to Authorized domains in Firebase Console
- For local development, ensure localhost is in the list

### Google Sign-in popup blocked
- Allow popups for localhost in your browser
- Or use redirect method instead of popup (requires code changes)

### "Firebase: Error (auth/api-key-not-valid)"
- Verify your API key in Firebase Console matches .env.local
- Check for extra spaces or quotes in .env.local

## Next Steps

- Add password reset functionality
- Implement email verification
- Add user profile management
- Set up Firebase security rules
- Configure Firebase Hosting for deployment
