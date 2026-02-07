import React from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Database } from 'lucide-react';

const Settings = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-neutral-400">Manage your application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-white">Profile Settings</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Username</label>
              <input 
                type="text" 
                defaultValue="admin@valuechain.io"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Display Name</label>
              <input 
                type="text" 
                defaultValue="System Administrator"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-lg font-bold text-white">Notifications</h3>
          </div>
          <div className="space-y-4">
            {['Email notifications', 'Push notifications', 'SMS alerts', 'Weekly reports'].map((item, i) => (
              <label key={i} className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">{item}</span>
                <input 
                  type="checkbox" 
                  defaultChecked={i < 2}
                  className="w-5 h-5 rounded bg-neutral-900 border-neutral-700 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold text-white">Security</h3>
          </div>
          <div className="space-y-4">
            <button className="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg px-4 py-3 text-left transition-colors">
              <div className="text-sm font-medium text-white">Change Password</div>
              <div className="text-xs text-neutral-500 mt-1">Update your password regularly</div>
            </button>
            <button className="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg px-4 py-3 text-left transition-colors">
              <div className="text-sm font-medium text-white">Two-Factor Authentication</div>
              <div className="text-xs text-neutral-500 mt-1">Add an extra layer of security</div>
            </button>
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-lg font-bold text-white">Data Management</h3>
          </div>
          <div className="space-y-4">
            <button className="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg px-4 py-3 text-left transition-colors">
              <div className="text-sm font-medium text-white">Export Data</div>
              <div className="text-xs text-neutral-500 mt-1">Download your data as CSV or JSON</div>
            </button>
            <button className="w-full bg-red-900/20 hover:bg-red-900/30 border border-red-800 rounded-lg px-4 py-3 text-left transition-colors">
              <div className="text-sm font-medium text-red-400">Delete Account</div>
              <div className="text-xs text-red-500/70 mt-1">Permanently remove your account</div>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <button className="px-6 py-2.5 border border-neutral-800 rounded-lg text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors">
          Cancel
        </button>
        <button className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white font-medium transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
