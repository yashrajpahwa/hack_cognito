import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "./config";
import { FileText, Sparkles, Globe } from "lucide-react";

const Reports = () => {
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
          throw new Error("Failed to load reports");
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
        <p className="text-sm text-neutral-400">Preparing insights…</p>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="p-8">
        <p className="text-sm text-red-400">Failed to build report: {error || "unknown"}</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="w-5 h-5 text-emerald-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Reports</h1>
          <p className="text-neutral-400 text-sm">
            Narrative summaries derived from the Sell Waste dataset.
          </p>
        </div>
      </div>

      <div className="bg-[#0f0f0f] border border-neutral-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-400 mt-1" />
          <div>
            <p className="text-sm text-neutral-500 uppercase tracking-[0.4em]">Momentum</p>
            <p className="text-white text-lg font-semibold">Industrial symbiosis is accelerating</p>
            <p className="text-neutral-400 text-sm">
              {metrics.topMaterials[0]} demand is surging, especially in {metrics.topCities[0]?.city}.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Globe className="w-5 h-5 text-cyan-400 mt-1" />
          <div>
            <p className="text-sm text-neutral-500 uppercase tracking-[0.4em]">Geography</p>
            <p className="text-white text-lg font-semibold">{metrics.topCities[0]?.city || "Local"} remains the primary hub</p>
            <p className="text-neutral-400 text-sm">
              {metrics.topCities[0]?.count || 0} companies recorded, across {metrics.topCities.length} tracked cities.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Globe className="w-5 h-5 text-emerald-400 mt-1" />
          <div>
            <p className="text-sm text-neutral-500 uppercase tracking-[0.4em]">Risk</p>
            <p className="text-white text-lg font-semibold">{metrics.topRiskAppetite || "Balanced"}</p>
            <p className="text-neutral-400 text-sm">
              Partner risk tolerance remains steady, enabling predictable routing and scheduling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
