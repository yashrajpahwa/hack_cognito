import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  BarChart3,
  Settings,
  Database,
  TrendingUp,
  Users,
  FileText,
  Globe,
  X,
  ShoppingCart,
  Trash2,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "City Simulation", path: "/city", icon: Globe },
    { name: "Marketplace", path: "/marketplace", icon: ShoppingCart },
    { name: "Sell Waste", path: "/sell-waste", icon: Trash2 },
    // { name: "Analytics", path: "/analytics", icon: BarChart3 },
    // { name: "Data Center", path: "/data", icon: Database },
    // { name: "Partners", path: "/partners", icon: Users },
    // { name: "Reports", path: "/reports", icon: FileText },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const sidebarClasses =
    "fixed top-0 left-0 h-full w-64 bg-[#0a0a0a] border-r border-neutral-800 transform transition-transform duration-300 ease-in-out z-50";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={
          sidebarClasses +
          (isOpen ? " translate-x-0" : " -translate-x-full lg:translate-x-0")
        }
      >
        <div className="flex flex-col h-full">
          <div className="h-16 border-b border-neutral-800 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-sm font-black tracking-tight text-white">
                  VALUE<span className="text-emerald-500">CHAIN</span>
                </h1>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1.5 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-neutral-400" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 " +
                    (isActive
                      ? "bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50")
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon
                        className={
                          "w-5 h-5" + (isActive ? " text-emerald-500" : "")
                        }
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>
          <div className="p-4 border-t border-neutral-800">
            <div className="bg-neutral-900/50 rounded-lg p-3 border border-neutral-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  System Active
                </span>
              </div>
              <p className="text-[10px] text-neutral-500 leading-relaxed">
                AI optimization running
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
