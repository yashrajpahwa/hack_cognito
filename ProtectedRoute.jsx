import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from './authStore';
import { Loader } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className='min-h-screen bg-neutral-950 flex items-center justify-center'>
        <div className='text-center'>
          <Loader className='w-12 h-12 text-emerald-500 animate-spin mx-auto mb-4' />
          <p className='text-neutral-400'>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default ProtectedRoute;
