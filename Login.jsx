import React, { useState } from 'react';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import { useAuthStore } from './authStore';
import { LogIn, Mail, Lock, AlertCircle, Loader } from 'lucide-react';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (err) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      if (isSignUp) {
        result = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        result = await signInWithEmailAndPassword(auth, email, password);
      }
      setUser(result.user);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email already in use. Try signing in instead.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (err.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else {
        setError(err.message || 'Authentication failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]'>
            <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' />
            </svg>
          </div>
          <h1 className='text-3xl font-black text-white mb-2'>
            VALUE<span className='text-emerald-500'>CHAIN</span>
          </h1>
          <p className='text-neutral-400 text-sm'>Autonomous Industrial Symbiosis Platform</p>
        </div>

        <div className='bg-neutral-900 rounded-2xl border border-neutral-800 p-8 shadow-2xl'>
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-bold text-white mb-2'>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className='text-neutral-400 text-sm'>
              {isSignUp ? 'Sign up to get started' : 'Sign in to continue'}
            </p>
          </div>

          {error && (
            <div className='bg-red-900/20 border border-red-800 rounded-lg p-3 mb-6 flex gap-3'>
              <AlertCircle className='w-5 h-5 text-red-400 flex-shrink-0 mt-0.5' />
              <p className='text-red-200 text-sm'>{error}</p>
            </div>
          )}

          <form onSubmit={handleEmailAuth} className='space-y-4 mb-6'>
            <div>
              <label className='block text-sm font-medium text-neutral-300 mb-2'>
                Email Address
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500' />
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors'
                  placeholder='you@example.com'
                  required
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-neutral-300 mb-2'>
                Password
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500' />
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors'
                  placeholder=''
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-neutral-600 disabled:to-neutral-700 text-white font-bold rounded-lg transition-all shadow-lg disabled:shadow-none flex items-center justify-center gap-2'
            >
              {loading ? (
                <>
                  <Loader className='w-5 h-5 animate-spin' />
                  Processing...
                </>
              ) : (
                <>
                  <LogIn className='w-5 h-5' />
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </>
              )}
            </button>
          </form>

          <div className='relative mb-6'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-neutral-700'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-4 bg-neutral-900 text-neutral-500'>Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className='w-full px-6 py-3 bg-white hover:bg-neutral-100 disabled:bg-neutral-700 text-neutral-900 disabled:text-neutral-500 font-semibold rounded-lg transition-all flex items-center justify-center gap-3 border border-neutral-700'
          >
            <svg className='w-5 h-5' viewBox='0 0 24 24'>
              <path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' />
              <path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' />
              <path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' />
              <path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' />
            </svg>
            Sign in with Google
          </button>

          <div className='mt-6 text-center'>
            <button
              type='button'
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className='text-sm text-neutral-400 hover:text-emerald-400 transition-colors'
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>

        <p className='text-center text-neutral-500 text-xs mt-6'>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
