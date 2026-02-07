import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Factory as FactoryIcon,
  Truck,
  Zap,
  Leaf,
  Terminal,
  X,
  Share2,
  Activity,
  Box,
  TrendingUp,
  Globe,
  Hexagon,
  Wind,
  Droplets,
  BrainCircuit,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { FACTORY_DATA, GRID_SIZE, INITIAL_LOGS } from "./constants";

const StatCard = ({ label, value, icon: Icon, color, subtext, trend }) => (
  <div className="bg-[#0f0f0f]/80 border border-neutral-800/50 rounded-xl p-4 flex flex-col gap-1 backdrop-blur-md relative overflow-hidden group hover:border-neutral-700 transition-colors">
    <div
      className={`absolute inset-0 bg-gradient-to-br from-${color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
    />
    <div className="flex items-center justify-between z-10">
      <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
        {label}
      </span>
      <Icon className={`w-4 h-4 text-${color}-500`} />
    </div>
    <div className="flex items-baseline gap-2 z-10 mt-1">
      <div
        className={`text-2xl font-bold font-mono text-${color}-400 tracking-tight`}
      >
        {value}
      </div>
    </div>
    {subtext && (
      <div className="flex items-center gap-2 mt-1">
        {trend && <TrendingUp className="w-3 h-3 text-emerald-500" />}
        <div className="text-[9px] text-neutral-500 font-medium z-10">
          {subtext}
        </div>
      </div>
    )}
  </div>
);

const AgenticCity = () => {
  const [selectedFactory, setSelectedFactory] = useState(null);
  const [hoveredRoute, setHoveredRoute] = useState(null);
  const [routeOptions, setRouteOptions] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [transports, setTransports] = useState([]);
  const [logs, setLogs] = useState(
    INITIAL_LOGS.map((l) => ({
      ...l,
      id: Math.random().toString(),
      category: l.category,
    })),
  );
  const [stats, setStats] = useState({
    efficiency: 72,
    co2Saved: 340,
    activeFleets: 0,
    credits: 15400,
  });
  const [chartData, setChartData] = useState([{ time: "0", score: 72 }]);
  const [pollutionHeatmap, setPollution, Heatmap] = useState([
    { x: 11, y: 11, intensity: 0.8 },
  ]);
  const [prediction, setPrediction] = useState(null);
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  useEffect(() => {
    const predictions = [
      { message: "Cotton supply stabilizing in Sector 3.", type: "GOOD" },
      { message: "High demand for recycled glass detected.", type: "GOOD" },
      { message: "Storm approaching. Logistics delay probable.", type: "BAD" },
      { message: "Energy grid optimization available.", type: "NEUTRAL" },
      { message: "Steel surplus impacting market rates.", type: "BAD" },
    ];
    const timer = setInterval(() => {
      const randomPred =
        predictions[Math.floor(Math.random() * predictions.length)];
      setPrediction(randomPred);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const addLog = (message, category = "SYSTEM") => {
    setLogs((prev) => [
      ...prev.slice(-49),
      {
        id: Math.random().toString(),
        timestamp: new Date().toLocaleTimeString([], {
          hour12: false,
          minute: "2-digit",
          second: "2-digit",
        }),
        message,
        category,
      },
    ]);
  };

  const analyzeRoutes = (factory) => {
    setIsAnalyzing(true);
    setRouteOptions([]);
    setHoveredRoute(null);
    addLog(
      `Initiating Value Chain analysis for [${factory.name}]...`,
      "SYSTEM",
    );

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step === 1)
        addLog(
          `Identifying downstream partners for ${factory.output}...`,
          "OPTIMIZATION",
        );
      if (step === 2) {
        addLog(`Simulating 48hr market liquidity...`, "NEGOTIATION");
      }

      if (step === 3) {
        clearInterval(interval);
        generateOptions(factory);
        setIsAnalyzing(false);
      }
    }, 400);
  };

  const generateOptions = (source) => {
    const match = FACTORY_DATA.find((f) => f.input === source.output);
    const options = [];

    const demandRoll = Math.random();
    const demand =
      demandRoll > 0.8 ? "SURGE" : demandRoll > 0.5 ? "HIGH" : "MED";
    const basePrice = 500;
    const multiplier = demand === "SURGE" ? 1.5 : demand === "HIGH" ? 1.2 : 1.0;

    const neighbor = FACTORY_DATA.find(
      (f) =>
        f.id !== source.id &&
        f.output === source.output &&
        Math.abs(f.x - source.x) + Math.abs(f.y - source.y) < 6,
    );

    if (neighbor && match) {
      options.push({
        id: "opt_pooling",
        targetId: match.id,
        targetName: match.name,
        type: "POOLING",
        efficiencyScore: 99,
        credits: Math.floor(basePrice * 1.3 * multiplier + 200),
        co2Saved: 320,
        time: Math.abs(match.x - source.x) + Math.abs(match.y - source.y) + 3,
        risk: "LOW",
        description: `Collaborative logistics via ${neighbor.name}`,
        poolingPartner: {
          id: neighbor.id,
          name: neighbor.name,
          x: neighbor.x,
          y: neighbor.y,
          distance:
            Math.abs(neighbor.x - source.x) + Math.abs(neighbor.y - source.y),
        },
        marketDemand: demand,
      });
    }

    if (match) {
      options.push({
        id: "opt_circular",
        targetId: match.id,
        targetName: match.name,
        type: "CIRCULAR",
        efficiencyScore: 88,
        credits: Math.floor(basePrice * multiplier),
        co2Saved: 150,
        time: Math.abs(match.x - source.x) + Math.abs(match.y - source.y),
        risk: "LOW",
        description: `Direct industrial symbiosis link`,
        marketDemand: demand,
      });
    }

    options.push({
      id: "opt_recycle",
      targetId: "RECYCLE_CENTER",
      targetName: "City Recycle Hub",
      type: "RECYCLE",
      efficiencyScore: 65,
      credits: 150,
      co2Saved: 45,
      time: 8,
      risk: "MED",
      description: "Material recovery facility",
      marketDemand: "MED",
    });

    options.push({
      id: "opt_waste",
      targetId: "LANDFILL",
      targetName: "Municipal Dump",
      type: "DISPOSAL",
      efficiencyScore: 10,
      credits: -250,
      co2Saved: -100,
      time: 5,
      risk: "HIGH",
      description: "Landfill disposal (Regulatory Fee)",
      marketDemand: "LOW",
    });

    setRouteOptions(
      options.sort((a, b) => b.efficiencyScore - a.efficiencyScore),
    );
  };

  const dispatchTransport = (option) => {
    if (!selectedFactory) return;

    if (option.type === "DISPOSAL") {
      setPollutionHeatmap((prev) => [
        ...prev,
        { x: 11, y: 11, intensity: 1.0 },
      ]);
    } else {
      setPollutionHeatmap((prev) => prev.filter(() => Math.random() > 0.2));
    }

    const newEff = Math.min(
      100,
      (stats.efficiency + option.efficiencyScore) / 2,
    );
    setStats((prev) => ({
      efficiency: newEff,
      co2Saved: prev.co2Saved + option.co2Saved,
      activeFleets: prev.activeFleets + 1,
      credits: prev.credits + option.credits,
    }));
    setChartData((prev) => [
      ...prev.slice(-20),
      { time: new Date().getSeconds().toString(), score: newEff },
    ]);

    addLog(
      `Protocol executed: ${option.type} via ${option.targetName}.`,
      "OPTIMIZATION",
    );

    let path = [];
    const start = { x: selectedFactory.x, y: selectedFactory.y };

    let dest = { x: 0, y: 0 };
    if (option.targetId === "RECYCLE_CENTER") dest = { x: 6, y: 1 };
    else if (option.targetId === "LANDFILL") dest = { x: 11, y: 11 };
    else {
      const t = FACTORY_DATA.find((f) => f.id === option.targetId);
      if (t) dest = { x: t.x, y: t.y };
    }

    path.push(start);
    if (option.type === "POOLING" && option.poolingPartner) {
      path.push({ x: option.poolingPartner.x, y: option.poolingPartner.y });
    }
    path.push(dest);

    const newTransport = {
      id: Math.random().toString(),
      path: path,
      currentWaypointIndex: 0,
      color:
        option.type === "POOLING"
          ? "#ec4899"
          : option.type === "CIRCULAR"
            ? "#10b981"
            : option.type === "RECYCLE"
              ? "#f59e0b"
              : "#ef4444",
      progress: 0,
      material: selectedFactory.output,
      isPooled: option.type === "POOLING",
    };

    setTransports((prev) => [...prev, newTransport]);
    setSelectedFactory(null);
    setRouteOptions([]);
    setHoveredRoute(null);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTransports((prev) =>
        prev
          .map((t) => {
            const nextWaypoint = t.path[t.currentWaypointIndex + 1];
            if (!nextWaypoint) return null;
            let newProgress = t.progress + 2;
            if (newProgress >= 100) {
              const nextIndex = t.currentWaypointIndex + 1;
              if (nextIndex >= t.path.length - 1) return null;
              return { ...t, currentWaypointIndex: nextIndex, progress: 0 };
            }
            return { ...t, progress: newProgress };
          })
          .filter(Boolean),
      );
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const getTruckPosition = (t) => {
    const start = t.path[t.currentWaypointIndex];
    const end = t.path[t.currentWaypointIndex + 1];
    const x = start.x + (end.x - start.x) * (t.progress / 100);
    const y = start.y + (end.y - start.y) * (t.progress / 100);
    return { left: x * 50 + 25, top: y * 50 + 25 };
  };

  const getRoutePreviewPath = () => {
    if (!hoveredRoute || !selectedFactory) return null;

    let dest = { x: 0, y: 0 };
    if (hoveredRoute.targetId === "RECYCLE_CENTER") dest = { x: 6, y: 1 };
    else if (hoveredRoute.targetId === "LANDFILL") dest = { x: 11, y: 11 };
    else {
      const t = FACTORY_DATA.find((f) => f.id === hoveredRoute.targetId);
      if (t) dest = { x: t.x, y: t.y };
    }

    const points = [];
    points.push(
      `${selectedFactory.x * 50 + 25},${selectedFactory.y * 50 + 25}`,
    );
    if (hoveredRoute.poolingPartner) {
      points.push(
        `${hoveredRoute.poolingPartner.x * 50 + 25},${hoveredRoute.poolingPartner.y * 50 + 25}`,
      );
    }
    points.push(`${dest.x * 50 + 25},${dest.y * 50 + 25}`);

    return points.join(" ");
  };

  const getValueChainConnections = (f) => {
    return FACTORY_DATA.flatMap((other) => {
      if (other.id === f.id) return [];
      const isSupplier = other.output === f.input;
      const isCustomer = other.input === f.output;

      if (isSupplier || isCustomer) {
        return {
          from: isSupplier ? other : f,
          to: isSupplier ? f : other,
          type: isSupplier ? "SUPPLY" : "DEMAND",
        };
      }
      return [];
    });
  };

  return (
    <div className="flex h-full min-h-screen bg-[#030303] text-neutral-200 overflow-hidden font-sans selection:bg-emerald-500/30">
      <div className="flex-1 relative flex items-center justify-center bg-[#020202] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full"
              initial={{ x: Math.random() * 1000, y: Math.random() * 800 }}
              animate={{
                y: [null, Math.random() * 800],
                x: [null, Math.random() * 1000],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 20 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, #1a1a1a 0%, #000 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(50,255,150,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(50,255,150,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div
          className="relative z-10"
          style={{ width: GRID_SIZE * 50, height: GRID_SIZE * 50 }}
        >
          <div className="absolute inset-0 pointer-events-none transition-all duration-1000">
            {pollutionHeatmap.map((p, i) => (
              <div
                key={i}
                className="absolute rounded-full blur-[60px] opacity-40 animate-pulse"
                style={{
                  left: p.x * 50 - 50,
                  top: p.y * 50 - 50,
                  width: 150,
                  height: 150,
                  backgroundColor: "#ef4444",
                }}
              />
            ))}
          </div>

          <div className="absolute inset-0 border border-neutral-800/30 rounded-3xl bg-neutral-900/5 backdrop-blur-[2px] shadow-2xl" />

          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
              <linearGradient
                id="connGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>

            {selectedFactory &&
              getValueChainConnections(selectedFactory).map((conn, i) => (
                <motion.line
                  key={`vc-${i}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  x1={conn.from.x * 50 + 25}
                  y1={conn.from.y * 50 + 25}
                  x2={conn.to.x * 50 + 25}
                  y2={conn.to.y * 50 + 25}
                  stroke="url(#connGradient)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="animate-pulse"
                />
              ))}

            {!selectedFactory &&
              FACTORY_DATA.map((f1, i) =>
                FACTORY_DATA.map((f2, j) => {
                  if (i >= j) return null;
                  const isCompatible =
                    f1.output === f2.input || f2.output === f1.input;
                  if (!isCompatible) return null;
                  return (
                    <line
                      key={`${i}-${j}`}
                      x1={f1.x * 50 + 25}
                      y1={f1.y * 50 + 25}
                      x2={f2.x * 50 + 25}
                      y2={f2.y * 50 + 25}
                      stroke={isCompatible ? "#10b981" : "#333"}
                      strokeWidth="1"
                      strokeOpacity="0.05"
                    />
                  );
                }),
              )}

            {hoveredRoute && (
              <polyline
                points={getRoutePreviewPath() || ""}
                fill="none"
                stroke={
                  hoveredRoute.type === "POOLING"
                    ? "#ec4899"
                    : hoveredRoute.type === "DISPOSAL"
                      ? "#ef4444"
                      : "#10b981"
                }
                strokeWidth="3"
                strokeDasharray="4,4"
                className="animate-pulse"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="drop-shadow(0 0 5px rgba(255,255,255,0.5))"
              />
            )}
          </svg>

          {FACTORY_DATA.map((factory) => {
            const isSelected = selectedFactory?.id === factory.id;
            const isTarget = hoveredRoute?.targetId === factory.id;
            const isPoolPartner =
              hoveredRoute?.poolingPartner?.id === factory.id;

            const isValueChain =
              selectedFactory &&
              (selectedFactory.input === factory.output ||
                selectedFactory.output === factory.input);

            return (
              <motion.button
                key={factory.id}
                onClick={() => {
                  setSelectedFactory(factory);
                  analyzeRoutes(factory);
                }}
                className="absolute w-12 h-12 -ml-6 -mt-6 z-20 group"
                style={{ left: factory.x * 50 + 25, top: factory.y * 50 + 25 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
                    isSelected
                      ? `border-${factory.color} shadow-[0_0_40px_${factory.color}] scale-110 bg-${factory.color}/20`
                      : isTarget
                        ? "border-white animate-pulse shadow-[0_0_20px_white]"
                        : isPoolPartner
                          ? "border-pink-500 animate-bounce"
                          : isValueChain
                            ? `border-${factory.color} opacity-100`
                            : selectedFactory
                              ? "border-neutral-800 opacity-20"
                              : "border-neutral-800 group-hover:border-neutral-500"
                  }`}
                  style={{
                    borderColor:
                      isSelected || isValueChain ? factory.color : undefined,
                  }}
                />

                <div className="absolute inset-1 bg-[#0a0a0a] rounded-full flex items-center justify-center overflow-hidden">
                  <div
                    className={`absolute inset-0 opacity-20 bg-${factory.color}`}
                  />
                  <FactoryIcon
                    className={`w-5 h-5 relative z-10 transition-colors ${selectedFactory && !isSelected && !isValueChain ? "text-neutral-700" : "text-white"}`}
                    style={{
                      color:
                        selectedFactory && !isSelected && !isValueChain
                          ? undefined
                          : factory.color,
                    }}
                  />
                </div>

                {!selectedFactory && (
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0a0a0a]/95 border border-neutral-700 px-3 py-2 rounded-lg pointer-events-none z-50 backdrop-blur-xl min-w-[140px] shadow-2xl">
                    <div className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider mb-1 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {factory.name}
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[9px] text-neutral-500">
                        <span>Output</span>
                        <span className="text-neutral-300 font-mono">
                          {factory.output}
                        </span>
                      </div>
                      <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500"
                          style={{ width: `${factory.efficiency}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.button>
            );
          })}

          <div
            className={`absolute bottom-0 right-0 w-20 h-20 -mr-10 -mt-10 border-2 border-dashed border-neutral-800 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${hoveredRoute?.targetId === "LANDFILL" ? "border-red-500 bg-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.4)]" : ""}`}
          >
            <div className="text-[8px] text-neutral-600 font-mono text-center font-bold tracking-widest">
              LANDFILL
              <br />
              ZONE
            </div>
          </div>
          <div
            className={`absolute top-0 right-6 w-20 h-20 -mt-10 border-2 border-dashed border-neutral-800 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${hoveredRoute?.targetId === "RECYCLE_CENTER" ? "border-amber-500 bg-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.4)]" : ""}`}
          >
            <div className="text-[8px] text-neutral-600 font-mono text-center font-bold tracking-widest">
              RECYCLE
              <br />
              HUB
            </div>
          </div>

          <AnimatePresence>
            {transports.map((t) => {
              const pos = getTruckPosition(t);
              return (
                <motion.div
                  key={t.id}
                  className="absolute z-30 pointer-events-none"
                  style={{ left: pos.left, top: pos.top }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <div className="relative -ml-3 -mt-3">
                    <div
                      className="absolute top-1/2 left-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-y-1/2 -translate-x-full blur-[0.5px]"
                      style={{ backgroundColor: t.color }}
                    />

                    <div className="w-6 h-6 rounded bg-[#0a0a0a] border border-neutral-600 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)] relative z-10">
                      <Truck className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-[450px] border-l border-neutral-800/80 bg-[#080808]/95 backdrop-blur-2xl flex flex-col z-20 shadow-[-10px_0_40px_rgba(0,0,0,0.8)] relative">
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-gradient-to-r from-neutral-900/50 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Globe className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-neutral-200 tracking-wide">
                SYSTEM <span className="text-emerald-500">OVERVIEW</span>
              </h2>
              <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                GRID ONLINE
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
              Total Value
            </div>
            <div className="text-lg font-bold text-white font-mono tracking-tight text-emerald-400">
              ${stats.credits.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto relative p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Efficiency"
              value={`${Math.round(stats.efficiency)}%`}
              icon={Activity}
              color="indigo"
              subtext="Grid Optimization"
              trend
            />
            <StatCard
              label="CO2 Diverted"
              value={`${stats.co2Saved}t`}
              icon={Leaf}
              color="emerald"
              subtext="Offset Total"
              trend
            />
          </div>

          <div className="relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/30 p-4">
            <div className="absolute top-0 right-0 p-2 opacity-20">
              <BrainCircuit className="w-12 h-12 text-purple-500" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">
                AI Forecast Engine
              </span>
            </div>
            <div className="min-h-[40px] flex items-center">
              {prediction ? (
                <motion.div
                  key={prediction.message}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 items-start"
                >
                  {prediction.type === "GOOD" ? (
                    <TrendingUp className="w-4 h-4 text-emerald-500 mt-0.5" />
                  ) : prediction.type === "BAD" ? (
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5" />
                  ) : (
                    <Activity className="w-4 h-4 text-neutral-500 mt-0.5" />
                  )}
                  <p className="text-sm text-neutral-300 font-medium leading-tight">
                    {prediction.message}
                  </p>
                </motion.div>
              ) : (
                <span className="text-xs text-neutral-600 font-mono animate-pulse">
                  Analyzing market vectors...
                </span>
              )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!selectedFactory ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center opacity-40 text-center space-y-4"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
                  <Hexagon className="w-16 h-16 text-neutral-500 stroke-1 relative z-10" />
                </div>
                <div className="text-xs font-mono text-neutral-400">
                  SELECT NODE TO INSPECT VALUE CHAIN
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-neutral-900/50 rounded-xl p-4 border border-neutral-800 relative overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 w-1 h-full bg-${selectedFactory.color}`}
                  />
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        Active Node
                      </div>
                      <h1 className="text-xl font-bold text-white tracking-tight">
                        {selectedFactory.name}
                      </h1>
                      <div className="flex gap-2 mt-2">
                        <span className="px-2 py-0.5 bg-black/40 rounded text-[10px] text-neutral-300 border border-neutral-700">
                          {selectedFactory.industry}
                        </span>
                        <span className="px-2 py-0.5 bg-black/40 rounded text-[10px] text-neutral-300 border border-neutral-700 font-mono">
                          OUT: {selectedFactory.output}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedFactory(null)}
                      className="p-1.5 hover:bg-white/10 rounded-full text-neutral-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex justify-between items-center border-b border-neutral-800 pb-2">
                    <span>Supply Chain Opportunities</span>
                    {isAnalyzing && (
                      <span className="text-emerald-500 animate-pulse text-[9px]">
                        CALCULATING...
                      </span>
                    )}
                  </div>

                  {isAnalyzing ? (
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-16 bg-neutral-900/50 rounded-lg animate-pulse border border-neutral-800"
                        />
                      ))}
                    </div>
                  ) : (
                    routeOptions.map((option, i) => (
                      <motion.div
                        key={option.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onMouseEnter={() => setHoveredRoute(option)}
                        onMouseLeave={() => setHoveredRoute(null)}
                        onClick={() => dispatchTransport(option)}
                        className={`relative group cursor-pointer border rounded-xl overflow-hidden transition-all duration-300 ${
                          hoveredRoute?.id === option.id
                            ? "border-neutral-500 bg-neutral-800 scale-[1.02] shadow-xl"
                            : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700"
                        }`}
                      >
                        <div
                          className={`absolute left-0 top-0 bottom-0 w-1 transition-colors ${
                            option.type === "POOLING"
                              ? "bg-gradient-to-b from-pink-500 to-purple-500"
                              : option.type === "DISPOSAL"
                                ? "bg-red-500"
                                : option.type === "CIRCULAR"
                                  ? "bg-emerald-500"
                                  : "bg-amber-500"
                          }`}
                        />

                        <div className="p-3 pl-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-0.5">
                                {option.type === "POOLING" && (
                                  <Share2 className="w-3.5 h-3.5 text-pink-500" />
                                )}
                                {option.type === "CIRCULAR" && (
                                  <Zap className="w-3.5 h-3.5 text-emerald-500" />
                                )}
                                {option.type === "DISPOSAL" && (
                                  <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                                )}
                                <span
                                  className={`text-[10px] font-bold uppercase ${
                                    option.type === "POOLING"
                                      ? "text-pink-400"
                                      : option.type === "DISPOSAL"
                                        ? "text-red-400"
                                        : option.type === "CIRCULAR"
                                          ? "text-emerald-400"
                                          : "text-amber-400"
                                  }`}
                                >
                                  {option.type}
                                </span>
                              </div>
                              <div className="text-sm font-bold text-neutral-200">
                                {option.targetName}
                              </div>
                            </div>
                            <div className="text-right">
                              <div
                                className={`text-sm font-mono font-bold ${option.credits > 0 ? "text-emerald-400" : "text-red-400"}`}
                              >
                                {option.credits > 0 ? "+" : ""}
                                {option.credits}
                              </div>
                              {option.marketDemand === "SURGE" && (
                                <div className="text-[9px] font-bold text-indigo-400 uppercase bg-indigo-500/10 px-1 rounded mt-1 inline-block">
                                  Surge Price
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-4 text-[10px] text-neutral-500 font-mono">
                            <span className="flex items-center gap-1">
                              <Leaf className="w-3 h-3" />{" "}
                              {option.co2Saved > 0 ? "+" : ""}
                              {option.co2Saved}kg
                            </span>
                            <span>TIME: {option.time}m</span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-48 border-t border-neutral-800 bg-[#050505] flex flex-col font-mono text-[10px]">
          <div className="px-4 py-2 border-b border-neutral-800 bg-neutral-900/50 flex justify-between items-center text-neutral-500 uppercase font-bold tracking-wider">
            <span className="flex items-center gap-2">
              <Terminal className="w-3 h-3" /> Autonomous Agent Log
            </span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
            </div>
          </div>
          <div ref={logRef} className="flex-1 overflow-y-auto p-3 space-y-2">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex gap-3 items-start opacity-70 hover:opacity-100 transition-opacity"
              >
                <span className="text-neutral-600 whitespace-nowrap">
                  [{log.timestamp}]
                </span>
                <span
                  className={`${
                    log.category === "OPTIMIZATION"
                      ? "text-emerald-500"
                      : log.category === "NEGOTIATION"
                        ? "text-purple-400"
                        : log.category === "ALERT"
                          ? "text-red-500"
                          : "text-neutral-400"
                  }`}
                >
                  <span className="font-bold mr-1">
                    {log.category === "SYSTEM"
                      ? ">"
                      : log.category === "NEGOTIATION"
                        ? "@"
                        : "#"}
                  </span>
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgenticCity;
