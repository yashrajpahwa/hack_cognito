import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useAuthStore } from './authStore';
import { Menu, LogOut } from 'lucide-react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import AgenticCity from './AgenticCity';
import Marketplace from './Marketplace';
import SellWaste from './SellWaste';
import Settings from './Settings';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [setUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={user ? <Navigate to='/' replace /> : <Login />} />
        
        <Route path='/*' element={
          <ProtectedRoute>
            <div className='min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-emerald-500/30 flex'>
              <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
              
              <div className='flex-1 flex flex-col lg:ml-64'>
                <header className='h-16 border-b border-neutral-800 flex items-center justify-between px-4 lg:px-6 bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-30'>
                  <div className='flex items-center gap-4'>
                    <button 
                      onClick={() => setSidebarOpen(true)}
                      className='lg:hidden p-2 hover:bg-neutral-800 rounded-lg transition-colors'
                    >
                      <Menu className='w-5 h-5 text-neutral-400' />
                    </button>
                    <div>
                      <h2 className='text-sm font-bold text-white'>VALUECHAIN SYSTEM</h2>
                      <p className='text-[10px] text-neutral-500 uppercase tracking-wider'>Autonomous Industrial Symbiosis</p>
                    </div>
                  </div>
                  
                  <div className='flex items-center gap-6'>
                    <div className='hidden md:flex items-center gap-3'>
                      <div className='text-right'>
                        <p className='text-xs font-medium text-white'>{user?.displayName || user?.email}</p>
                        <p className='text-[10px] text-neutral-500'>Logged in</p>
                      </div>
                      {user?.photoURL && (
                        <img src={user.photoURL} alt='Profile' className='w-8 h-8 rounded-full border-2 border-emerald-500' />
                      )}
                    </div>
                    <button
                      onClick={handleLogout}
                      className='flex items-center gap-2 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors'
                      title='Logout'
                    >
                      <LogOut className='w-4 h-4 text-neutral-400' />
                      <span className='text-xs text-neutral-400 hidden sm:inline'>Logout</span>
                    </button>
                  </div>
                </header>

                <main className='flex-1 overflow-auto bg-[#030303]'>
                  <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/city' element={<AgenticCity />} />
                    <Route path='/marketplace' element={<Marketplace />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/sell-waste' element={<SellWaste />} />
                    <Route path='/analytics' element={
                      <div className='p-8'>
                        <h1 className='text-3xl font-bold text-white mb-2'>Analytics</h1>
                        <p className='text-neutral-400'>Advanced analytics and reporting coming soon...</p>
                      </div>
                    } />
                    <Route path='/data' element={
                      <div className='p-8'>
                        <h1 className='text-3xl font-bold text-white mb-2'>Data Center</h1>
                        <p className='text-neutral-400'>Data management and visualization coming soon...</p>
                      </div>
                    } />
                    <Route path='/partners' element={
                      <div className='p-8'>
                        <h1 className='text-3xl font-bold text-white mb-2'>Partners</h1>
                        <p className='text-neutral-400'>Partner management coming soon...</p>
                      </div>
                    } />
                    <Route path='/reports' element={
                      <div className='p-8'>
                        <h1 className='text-3xl font-bold text-white mb-2'>Reports</h1>
                        <p className='text-neutral-400'>Report generation coming soon...</p>
                      </div>
                    } />
                  </Routes>
                </main>
              </div>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
