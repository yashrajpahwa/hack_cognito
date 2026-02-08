import React, { useEffect, useState } from "react";
import { Sparkles, Globe, Activity, TrendingUp } from "lucide-react";
import { API_BASE_URL } from "./config";

const accentClasses = {
  emerald: "text-emerald-400",
  cyan: "text-cyan-400",
  violet: "text-violet-400",
  amber: "text-amber-400",
};

const MetricCard = ({ label, value, detail, icon: Icon, accent }) => (
  <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6 flex flex-col gap-3 hover:border-neutral-700 transition-colors">
    <div className="flex items-center justify-between">
      <span className="text-xs uppercase tracking-widest text-neutral-500">{label}</span>
      <Icon className={`w-5 h-5 ${accentClasses[accent] || "text-white"}`} />
    </div>
    <div className="text-3xl font-bold text-white">{value}</div>
    {detail && <p className="text-xs text-neutral-400">{detail}</p>}
  </div>
);

const Analytics = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadMetrics = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/insights/metrics`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`API ${res.status}`);
        }

        const data = await res.json();
        setMetrics(data.metrics);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-sm text-neutral-400">Loading analytics…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-sm font-medium text-red-400">Failed to load analytics: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Analytics</h1>
        <p className="text-neutral-400 text-sm">
          Live health metrics driven by the Sell Waste Today dataset.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Companies"
          value={metrics.totalCompanies.toLocaleString()}
          detail="customer base tracked"
          icon={Globe}
          accent="emerald"
        />
        <MetricCard
          label="Waste volume"
          value={`${metrics.totalWaste.toLocaleString()}kg`}
          detail={`≈ ${metrics.avgWastePerCompany.toFixed(0)}kg per company`}
          icon={Activity}
          accent="cyan"
        />
        <MetricCard
          label="Top industry"
          value={metrics.topIndustry}
          detail={`${metrics.industryCounts[metrics.topIndustry] || 0} companies`}
          icon={TrendingUp}
          accent="violet"
        />
        <MetricCard
          label="Popular material"
          value={metrics.topMaterials[0] || "—"}
          detail="Ranked by quantity"
          icon={Sparkles}
          accent="amber"
        />
      </div>

      <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-3">City Heat</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.topCities.map(({ city, count }) => (
            <div key={city} className="bg-neutral-900/40 border border-neutral-800 rounded-lg p-3 text-sm">
              <p className="text-neutral-400 text-xs uppercase tracking-widest">City</p>
              <p className="text-white text-lg font-semibold">{city}</p>
              <p className="text-neutral-500">{count} companies</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-bold text-white">Material Demand</h2>
        <div className="flex flex-wrap gap-3">
          {metrics.topMaterials.map((material) => (
            <span key={material} className="text-xs text-neutral-200 bg-neutral-900/60 border border-neutral-700 px-3 py-1 rounded-full">
              {material}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
