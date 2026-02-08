import React, { useEffect, useMemo, useState } from "react";
import {
  ShoppingCart,
  Filter,
  Search,
  UserCheck,
  Sparkles,
  ShieldCheck,
  Package,
  X,
} from "lucide-react";
import { API_BASE_URL } from "./config";

const formatKg = (value) => `${Math.max(0, Math.round(value))} kg`;

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/insights/companies`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`API ${res.status}`);
        }

        const data = await res.json();
        const normalized = (data.companies || []).map((company) => ({
          id: company.companyId,
          name: company.companyName,
          industry: company.industry || "other",
          city: company.city || "unknown",
          wasteVolume: company.wasteVolume || 0,
          riskAppetite: company.riskAppetite || "balanced",
          price: Math.round(Math.max(240, (company.wasteVolume || 200) * 1.3)),
          certified: company.riskAppetite === "cost",
          description: `${company.industry || "Circular"} partner located in ${company.city || "unknown city"}`,
        }));

      setProducts(normalized);
      setFiltered(normalized);
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

  const categories = useMemo(() => {
    const set = new Set(["all"]);
    products.forEach((item) => set.add(item.industry));
    return Array.from(set);
  }, [products]);

  useEffect(() => {
    const lower = searchQuery.toLowerCase();
    const filteredList = products.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(lower) || item.city.toLowerCase().includes(lower);
      const matchesCategory = selectedCategory === "all" || item.industry === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    setFiltered(filteredList);
  }, [products, searchQuery, selectedCategory]);

  const stats = useMemo(() => {
    const industryVolumes = {};
    let totalVolume = 0;

    products.forEach((product) => {
      const industry = product.industry || "other";
      industryVolumes[industry] = (industryVolumes[industry] || 0) + product.wasteVolume;
      totalVolume += product.wasteVolume;
    });

    const topIndustry =
      Object.entries(industryVolumes).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

    return {
      totalListings: products.length,
      totalVolume,
      topIndustry,
    };
  }, [products]);

  return (
    <div className="p-8 space-y-8 relative">
      <div>
        <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-white">Marketplace</h1>
            <p className="text-sm text-neutral-400">Live waste liquidity pool from the Sell Waste dataset.</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-neutral-400">
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Total Companies: <span className="text-white font-semibold">{stats.totalListings}</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Top Industry: <span className="text-white font-semibold">{stats.topIndustry}</span>
            </div>
            <div className="flex items-center gap-1">
              <Package className="w-4 h-4 text-indigo-400" />
              Total Waste: <span className="text-white font-semibold">{formatKg(stats.totalVolume)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-4 flex items-center gap-3">
            <Filter className="w-5 h-5 text-emerald-500" />
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="flex-1 bg-transparent border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-200"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-4 flex items-center gap-3">
            <Search className="w-5 h-5 text-emerald-500" />
            <input
              type="search"
              placeholder="Search city or partner"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="flex-1 bg-transparent border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-200 focus:outline-none"
            />
          </div>
          <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-4 flex items-center gap-3">
            <UserCheck className="w-5 h-5 text-emerald-500" />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Risk Appetite Mix</p>
              <p className="text-sm text-neutral-200">
                {Array.from(new Set(products.map((item) => item.riskAppetite))).join(", ") || "None"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-8 text-center text-sm text-neutral-400">
          <p>Loading listings…</p>
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-2xl p-6 text-sm text-red-200">
          Unable to load marketplace: {error}
        </div>
      )}

      {!loading && !error && (
        <div className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-6">
          <div className="grid gap-4 max-h-[70vh] overflow-y-auto pr-2">
            {filtered.length === 0 && (
              <p className="text-sm text-neutral-500">No partners match that filter.</p>
            )}
            {filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelected(product)}
                className="bg-[#050505]/80 border border-neutral-800 rounded-2xl p-5 flex flex-col gap-4 cursor-pointer hover:border-emerald-500/60 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-neutral-400 uppercase tracking-[0.4em]">{product.industry}</p>
                    <h2 className="text-xl font-semibold text-white">{product.name}</h2>
                    <p className="text-xs text-neutral-500">{product.city}</p>
                  </div>
                  <span className="text-sm text-emerald-400 font-semibold">{product.riskAppetite} risk</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
                  <span>Price: <span className="text-white font-semibold">${product.price.toLocaleString()}</span></span>
                  <span>Volume: <span className="text-white font-semibold">{formatKg(product.wasteVolume)}</span></span>
                  <span>Listings: <span className="text-white font-semibold">{product.wasteVolume ? "bulk" : "spot"}</span></span>
                </div>
                <p className="text-sm text-neutral-400">{product.description}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Deals are advisory only.</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelected(null);
            }
          }}
        >
          <div className="relative w-full max-w-4xl mx-4 bg-[#050505] border border-neutral-800 rounded-3xl p-8 shadow-2xl">
            <button
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
              onClick={() => setSelected(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-[0.4em]">
                {selected.industry}
              </p>
              <h2 className="text-3xl font-bold text-white">{selected.name}</h2>
              <p className="text-sm text-neutral-400">{selected.city}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4">
                <p className="text-xs text-neutral-500 uppercase">Risk Appetite</p>
                <p className="text-white font-semibold">{selected.riskAppetite}</p>
              </div>
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4">
                <p className="text-xs text-neutral-500 uppercase">Waste Stored</p>
                <p className="text-white font-semibold">{formatKg(selected.wasteVolume)}</p>
              </div>
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4">
                <p className="text-xs text-neutral-500 uppercase">Price</p>
                <p className="text-white font-semibold">${selected.price.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-6 border-t border-neutral-800 pt-6 space-y-4">
              <p className="text-sm text-neutral-300">
                {selected.description} This partner typically processes {selected.wasteVolume} kg
                per pickup window. The dashboard can highlight them to spot circular opportunities.
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-neutral-400">
                <span className="bg-neutral-900/60 border border-neutral-800 px-3 py-1 rounded-full">
                  view local inventory
                </span>
                <span className="bg-neutral-900/60 border border-neutral-800 px-3 py-1 rounded-full">
                  schedule live walkthrough
                </span>
                <span className="bg-neutral-900/60 border border-neutral-800 px-3 py-1 rounded-full">
                  flag for recycle push
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
