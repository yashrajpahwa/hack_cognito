import React from 'react';
import AgenticCity from './AgenticCity';

const App = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 overflow-hidden flex flex-col font-sans selection:bg-emerald-500/30">
      <header className="h-16 border-b border-neutral-800 flex items-center justify-between px-6 bg-[#050505]/80 backdrop-blur-xl z-50 relative">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white">VALUE<span className="text-emerald-500">CHAIN</span></h1>
            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.2em]">Autonomous Industrial Symbiosis</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
           <div className="flex flex-col items-end">
             <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest">System Load</span>
             <div className="flex gap-1 mt-1">
               <div className="w-1 h-3 bg-emerald-500 rounded-full animate-pulse" />
               <div className="w-1 h-3 bg-emerald-500 rounded-full animate-pulse delay-75" />
               <div className="w-1 h-3 bg-emerald-500/30 rounded-full" />
             </div>
           </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest">AI Status</span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              PREDICTIVE MODELING ACTIVE
            </span>
          </div>
        </div>
      </header>
      
      <main className="flex-1 relative">
        <AgenticCity />
      </main>
    </div>
  );
};

export default App;
