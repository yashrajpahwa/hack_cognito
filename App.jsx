import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import AgenticCity from './AgenticCity';
import Marketplace from './Marketplace';
import SellWaste from './SellWaste';
import Settings from './Settings';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-emerald-500/30 flex">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        <div className="flex-1 flex flex-col lg:ml-64">
          {/* Top Header Bar */}
          <header className="h-16 border-b border-neutral-800 flex items-center justify-between px-4 lg:px-6 bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-neutral-400" />
              </button>
              <div>
                <h2 className="text-sm font-bold text-white">VALUECHAIN SYSTEM</h2>
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Autonomous Industrial Symbiosis</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest">System Load</span>
                <div className="flex gap-1 mt-1">
                  <div className="w-1 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <div className="w-1 h-3 bg-emerald-500 rounded-full animate-pulse delay-75" />
                  <div className="w-1 h-3 bg-emerald-500/30 rounded-full" />
                </div>
              </div>
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest">AI Status</span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  ACTIVE
                </span>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto bg-[#030303]">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/city" element={<AgenticCity />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/sell-waste" element={<SellWaste />} />
              <Route path="/analytics" element={
                <div className="p-8">
                  <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
                  <p className="text-neutral-400">Advanced analytics and reporting coming soon...</p>
                </div>
              } />
              <Route path="/data" element={
                <div className="p-8">
                  <h1 className="text-3xl font-bold text-white mb-2">Data Center</h1>
                  <p className="text-neutral-400">Data management and visualization coming soon...</p>
                </div>
              } />
              <Route path="/partners" element={
                <div className="p-8">
                  <h1 className="text-3xl font-bold text-white mb-2">Partners</h1>
                  <p className="text-neutral-400">Partner management coming soon...</p>
                </div>
              } />
              <Route path="/reports" element={
                <div className="p-8">
                  <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
                  <p className="text-neutral-400">Report generation coming soon...</p>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
