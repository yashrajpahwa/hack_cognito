import React from 'react';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-neutral-400">Welcome to the ValueChain control center</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6 hover:border-emerald-500/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
            </div>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">\,231</h3>
          <p className="text-sm text-neutral-500">Total Revenue</p>
        </div>

        <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded">+8</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">127</h3>
          <p className="text-sm text-neutral-500">Active Partners</p>
        </div>

        <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-xs font-bold text-purple-500 bg-purple-500/10 px-2 py-1 rounded">+24%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">89%</h3>
          <p className="text-sm text-neutral-500">System Efficiency</p>
        </div>

        <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6 hover:border-amber-500/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-amber-500" />
            </div>
            <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded">+5.2%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">\.4K</h3>
          <p className="text-sm text-neutral-500">Avg Transaction</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-neutral-900/50 rounded-lg">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">Transaction #{1000 + i}</p>
                  <p className="text-xs text-neutral-500">2 minutes ago</p>
                </div>
                <span className="text-sm font-bold text-emerald-400">+\,400</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">System Status</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-400">CPU Usage</span>
                <span className="text-white font-mono">45%</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-400">Memory</span>
                <span className="text-white font-mono">67%</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '67%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-400">Network</span>
                <span className="text-white font-mono">23%</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '23%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
