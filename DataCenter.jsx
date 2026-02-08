import React, { useEffect, useState } from "react";
import { Database, MapPin } from "lucide-react";
import { API_BASE_URL } from "./config";

const DataCenter = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchCompanies = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/insights/companies`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Failed to load dataset");
        }

        const data = await res.json();
        setCompanies(data.companies || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
    return () => controller.abort();
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-3">
        <Database className="w-5 h-5 text-emerald-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Data Center</h1>
          <p className="text-neutral-400 text-sm">
            Live dataset records powering the ValueChain AI.
          </p>
        </div>
      </div>

      {loading && <p className="text-sm text-neutral-400">Loading dataset…</p>}
      {error && <p className="text-sm text-red-400">Error: {error}</p>}

      {!loading && !error && (
        <div className="grid gap-4">
          {companies.map((company) => (
            <div key={company.companyId} className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-white">{company.companyName}</h2>
                <span className="text-xs uppercase tracking-widest text-neutral-500">{company.industry}</span>
              </div>
              <p className="text-sm text-neutral-400 mb-2">
                <MapPin className="inline-block h-4 w-4 mr-1 text-emerald-400" />
                {company.city}, {company.state}
              </p>
              <div className="text-xs text-neutral-500">
                <span className="font-semibold text-white">Risk appetite:</span> {company.riskAppetite}
                <span className="mx-2 text-neutral-700">|</span>
                <span className="font-semibold text-white">Waste volume:</span> {company.wasteVolume.toFixed(0)} kg
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataCenter;
