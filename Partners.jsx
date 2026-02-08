import React, { useEffect, useState } from "react";
import { Building2, Users, Layers } from "lucide-react";
import { API_BASE_URL } from "./config";

const Partners = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/insights/metrics`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Unable to fetch partner metrics");
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

    load();
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-sm text-neutral-400">Syncing partner profile…</p>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="p-8">
        <p className="text-sm text-red-400">Failed to load partners: {error || "unknown reason"}</p>
      </div>
    );
  }

  const topIndustries = Object.entries(metrics.industryCounts || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-3">
        <Building2 className="w-5 h-5 text-amber-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Partners</h1>
          <p className="text-neutral-400 text-sm">Partner composition based on the dataset</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6">
          <p className="text-sm text-neutral-500 uppercase tracking-[0.3em] mb-3">Industry mix</p>
          <div className="space-y-3">
            {topIndustries.map(([industry, count]) => (
              <div key={industry} className="flex items-center justify-between">
                <span className="text-white">{industry}</span>
                <span className="text-sm text-neutral-400">{count} partners</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6">
          <p className="text-sm text-neutral-500 uppercase tracking-[0.3em] mb-3">Key supply cities</p>
          <div className="grid grid-cols-2 gap-3">
            {metrics.topCities.map(({ city, count }) => (
              <div key={city} className="bg-neutral-900/60 rounded-lg p-3 text-xs text-neutral-300">
                <p className="font-semibold text-white">{city}</p>
                <p>{count} partners</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-6 flex items-center justify-between">
        <div>
          <p className="text-xs text-neutral-500 uppercase tracking-[0.3em]">Top risk appetite</p>
          <p className="text-2xl font-bold text-white">{metrics.topRiskAppetite || "balanced"}</p>
        </div>
        <Users className="w-6 h-6 text-emerald-400" />
      </div>
    </div>
  );
};

export default Partners;
