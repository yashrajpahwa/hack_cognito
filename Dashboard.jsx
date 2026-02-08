import React, { useState, useEffect } from "react";
import {
  Brain,
  Cpu,
  TrendingUp,
  Zap,
  DollarSign,
  Leaf,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Bot,
} from "lucide-react";

const Dashboard = () => {
  const [liveMetrics, setLiveMetrics] = useState({
    activeAgents: 12,
    tasksCompleted: 1847,
    optimization: 94.2,
    profitIncrease: 18.5,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics((prev) => ({
        activeAgents: prev.activeAgents + Math.floor(Math.random() * 3) - 1,
        tasksCompleted: prev.tasksCompleted + Math.floor(Math.random() * 5),
        optimization: Math.min(
          99.9,
          prev.optimization + (Math.random() * 0.2 - 0.1),
        ),
        profitIncrease: Math.max(
          0,
          prev.profitIncrease + (Math.random() * 0.5 - 0.25),
        ),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const agents = [
    {
      id: "AGT-001",
      name: "Route Optimizer",
      status: "active",
      task: "Optimizing 47 delivery routes",
      efficiency: 96.4,
      color: "emerald",
    },
    {
      id: "AGT-002",
      name: "Demand Predictor",
      status: "active",
      task: "Analyzing market trends",
      efficiency: 92.1,
      color: "blue",
    },
    {
      id: "AGT-003",
      name: "Inventory Manager",
      status: "active",
      task: "Rebalancing stock levels",
      efficiency: 98.7,
      color: "purple",
    },
    {
      id: "AGT-004",
      name: "Price Optimizer",
      status: "processing",
      task: "Computing optimal pricing",
      efficiency: 94.3,
      color: "amber",
    },
    {
      id: "AGT-005",
      name: "Carbon Tracker",
      status: "active",
      task: "Monitoring emissions",
      efficiency: 97.2,
      color: "green",
    },
    {
      id: "AGT-006",
      name: "Supplier Scout",
      status: "idle",
      task: "Awaiting next scan cycle",
      efficiency: 89.5,
      color: "neutral",
    },
  ];

  const optimizations = [
    {
      time: "2m ago",
      action: "Reduced waste in cotton processing",
      impact: "+\K",
      type: "profit",
      agent: "AGT-003",
    },
    {
      time: "5m ago",
      action: "Optimized steel delivery route",
      impact: "-12% CO2",
      type: "sustainability",
      agent: "AGT-001",
    },
    {
      time: "8m ago",
      action: "Negotiated better supplier rates",
      impact: "+\K",
      type: "profit",
      agent: "AGT-006",
    },
    {
      time: "12m ago",
      action: "Predicted demand surge, adjusted inventory",
      impact: "+15% efficiency",
      type: "efficiency",
      agent: "AGT-002",
    },
    {
      time: "18m ago",
      action: "Automated quality control checks",
      impact: "-8% defects",
      type: "quality",
      agent: "AGT-004",
    },
  ];

  return (
    <div className="overflow-scroll h-screen p-8 pb-20">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              Agentic AI Control Center
            </h1>
            <p className="text-neutral-400">
              Autonomous supply chain optimization in real-time
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0f0f0f] border border-emerald-800 rounded-xl p-6 relative overflow-hidden group hover:border-emerald-500 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="flex items-center gap-1 text-emerald-400">
                <Activity className="w-4 h-4 animate-pulse" />
                <span className="text-xs font-bold">LIVE</span>
              </div>
            </div>
            <h3 className="text-3xl font-black text-white mb-1">
              {liveMetrics.activeAgents}
            </h3>
            <p className="text-sm text-neutral-400">Active AI Agents</p>
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-blue-800 rounded-xl p-6 relative overflow-hidden group hover:border-blue-500 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-500" />
              </div>
              <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                +{liveMetrics.optimization.toFixed(1)}%
              </span>
            </div>
            <h3 className="text-3xl font-black text-white mb-1">
              {liveMetrics.tasksCompleted.toLocaleString()}
            </h3>
            <p className="text-sm text-neutral-400">Tasks Optimized Today</p>
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-purple-800 rounded-xl p-6 relative overflow-hidden group hover:border-purple-500 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-500" />
              </div>
              <div className="flex items-center gap-1 text-purple-400">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-xs font-bold">
                  +{liveMetrics.profitIncrease.toFixed(1)}%
                </span>
              </div>
            </div>
            <h3 className="text-3xl font-black text-white mb-1">\M</h3>
            <p className="text-sm text-neutral-400">Profit Increase (30d)</p>
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-green-800 rounded-xl p-6 relative overflow-hidden group hover:border-green-500 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-green-500" />
              </div>
              <div className="flex items-center gap-1 text-green-400">
                <ArrowDownRight className="w-4 h-4" />
                <span className="text-xs font-bold">-23%</span>
              </div>
            </div>
            <h3 className="text-3xl font-black text-white mb-1">284t</h3>
            <p className="text-sm text-neutral-400">CO2 Reduced (30d)</p>
          </div>
        </div>
      </div>

      {/* AI Agents Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-500" />
              AI Agent Fleet Status
            </h3>
            <span className="text-xs text-neutral-500">
              Last updated: just now
            </span>
          </div>
          <div className="space-y-3">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4 hover:border-neutral-700 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={
                      "w-10 h-10 bg-" +
                      agent.color +
                      "-500/10 rounded-lg flex items-center justify-center flex-shrink-0"
                    }
                  >
                    <Brain className={"w-5 h-5 text-" + agent.color + "-500"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-white">
                        {agent.name}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono">
                        {agent.id}
                      </span>
                      {agent.status === "active" ? (
                        <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                          Active
                        </span>
                      ) : agent.status === "processing" ? (
                        <span className="flex items-center gap-1 text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" />
                          Processing
                        </span>
                      ) : (
                        <span className="text-xs text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded-full">
                          Idle
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400">{agent.task}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">
                      {agent.efficiency}%
                    </div>
                    <div className="text-xs text-neutral-500">Efficiency</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            System Performance
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-400">Algorithm Efficiency</span>
                <span className="text-white font-mono font-bold">
                  {liveMetrics.optimization.toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                  style={{ width: liveMetrics.optimization + "%" }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-400">Decision Accuracy</span>
                <span className="text-white font-mono font-bold">97.8%</span>
              </div>
              <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  style={{ width: "97.8%" }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-400">Resource Utilization</span>
                <span className="text-white font-mono font-bold">87.3%</span>
              </div>
              <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  style={{ width: "87.3%" }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-400">Model Confidence</span>
                <span className="text-white font-mono font-bold">95.1%</span>
              </div>
              <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                  style={{ width: "95.1%" }}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-neutral-400">
                  Neural Network Load
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[72, 85, 64, 91, 78, 88].map((load, i) => (
                  <div
                    key={i}
                    className="bg-neutral-900 rounded p-2 text-center"
                  >
                    <div
                      className={
                        "text-lg font-bold " +
                        (load > 80 ? "text-amber-400" : "text-emerald-400")
                      }
                    >
                      {load}%
                    </div>
                    <div className="text-xs text-neutral-500">Node {i + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Optimizations */}
      <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          Recent Autonomous Optimizations
        </h3>
        <div className="space-y-3">
          {optimizations.map((opt, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-all group"
            >
              <div
                className={
                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 " +
                  (opt.type === "profit"
                    ? "bg-purple-500/10"
                    : opt.type === "sustainability"
                      ? "bg-green-500/10"
                      : opt.type === "efficiency"
                        ? "bg-blue-500/10"
                        : "bg-amber-500/10")
                }
              >
                {opt.type === "profit" ? (
                  <DollarSign className="w-5 h-5 text-purple-500" />
                ) : opt.type === "sustainability" ? (
                  <Leaf className="w-5 h-5 text-green-500" />
                ) : opt.type === "efficiency" ? (
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-amber-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white mb-1">
                  {opt.action}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-neutral-500">{opt.time}</span>
                  <span className="text-xs text-neutral-600"></span>
                  <span className="text-xs text-neutral-500 font-mono">
                    {opt.agent}
                  </span>
                </div>
              </div>
              <span
                className={
                  "text-sm font-bold px-3 py-1 rounded-lg " +
                  (opt.type === "profit"
                    ? "text-purple-400 bg-purple-500/10"
                    : opt.type === "sustainability"
                      ? "text-green-400 bg-green-500/10"
                      : opt.type === "efficiency"
                        ? "text-blue-400 bg-blue-500/10"
                        : "text-amber-400 bg-amber-500/10")
                }
              >
                {opt.impact}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
