import React, { useEffect, useMemo, useState } from "react";
import {
  ShoppingCart,
  Filter,
  Search,
  UserCheck,
  Sparkles,
  ShieldCheck,
  Package,
<<<<<<< HEAD
  X,
=======
  TrendingUp,
  Award,
  Check,
  Zap,
  Barcode,
  DollarSign,
>>>>>>> origin/main
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
  const [sortBy, setSortBy] = useState("trending");

<<<<<<< HEAD
  useEffect(() => {
    const controller = new AbortController();
=======
  const products = [
    {
      id: 1,
      name: "Industrial Cotton Surplus",
      category: "Raw Materials",
      price: 1250,
      unit: "per ton",
      supplier: "Apex Textiles",
      rating: 4.8,
      stock: 45,
      trending: true,
      description:
        "High-quality industrial cotton surplus from certified manufacturers",
      icon: "",
    },
    {
      id: 2,
      name: "Recycled Steel Ingots",
      category: "Metals",
      price: 3400,
      unit: "per ton",
      supplier: "Titan Smelting",
      rating: 4.9,
      stock: 120,
      certified: true,
      description: "Premium recycled steel with 99.5% purity rating",
      icon: "",
    },
    {
      id: 3,
      name: "Bio-Composite Sawdust",
      category: "Biomass",
      price: 450,
      unit: "per ton",
      supplier: "Horizon Furniture",
      rating: 4.6,
      stock: 280,
      description: "Sustainable biomass material perfect for energy generation",
      icon: "",
    },
    {
      id: 4,
      name: "Optical Grade Glass",
      category: "Components",
      price: 5600,
      unit: "per unit",
      supplier: "Crystal Optics",
      rating: 5.0,
      stock: 34,
      certified: true,
      trending: true,
      description: "Ultra-clear optical glass for precision manufacturing",
      icon: "",
    },
    {
      id: 5,
      name: "Silicon Wafer Scrap",
      category: "Electronics",
      price: 8900,
      unit: "per kg",
      supplier: "Omega Circuits",
      rating: 4.7,
      stock: 15,
      description: "High-grade silicon scrap suitable for recycling",
      icon: "",
    },
    {
      id: 6,
      name: "Recycled Plastic Pellets",
      category: "Polymers",
      price: 890,
      unit: "per ton",
      supplier: "ReCycle Hub",
      rating: 4.5,
      stock: 450,
      trending: true,
      description: "Food-grade recycled plastic pellets, mixed colors",
      icon: "",
    },
    {
      id: 7,
      name: "Industrial Ash Aggregate",
      category: "Construction",
      price: 320,
      unit: "per ton",
      supplier: "BioGen Power",
      rating: 4.4,
      stock: 890,
      description: "Clean ash aggregate for construction applications",
      icon: "",
    },
    {
      id: 8,
      name: "Wool Fiber Waste",
      category: "Raw Materials",
      price: 680,
      unit: "per ton",
      supplier: "Beta Weave",
      rating: 4.3,
      stock: 125,
      description: "Natural wool fiber waste for insulation manufacturing",
      icon: "",
    },
  ];
>>>>>>> origin/main

    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/insights/companies`, {
          signal: controller.signal,
        });

<<<<<<< HEAD
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
=======
  let filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
>>>>>>> origin/main

  if (sortBy === "trending") {
    filteredProducts.sort(
      (a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0),
    );
  } else if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  const totalValue = filteredProducts.reduce(
    (sum, p) => sum + p.price * p.stock,
    0,
  );
  const avgRating = (
    filteredProducts.reduce((sum, p) => sum + p.rating, 0) /
    filteredProducts.length
  ).toFixed(1);

  return (
<<<<<<< HEAD
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
=======
    <div className="overflow-scroll h-screen p-8 pb-20">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Marketplace</h1>
            <p className="text-neutral-400">
              Circular economy trading platform {filteredProducts.length}{" "}
              products
            </p>
          </div>
          <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white font-medium flex items-center gap-2 transition-colors">
            <Package className="w-5 h-5" />
            Sell Product
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0f0f0f] border border-neutral-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">0.8M</div>
                <div className="text-xs text-neutral-500">
                  Total Inventory Value
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#0f0f0f] border border-neutral-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{avgRating}</div>
                <div className="text-xs text-neutral-500">Average Rating</div>
              </div>
            </div>
          </div>
          <div className="bg-[#0f0f0f] border border-neutral-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {filteredProducts
                    .reduce((sum, p) => sum + p.stock, 0)
                    .toLocaleString()}
                </div>
                <div className="text-xs text-neutral-500">Units in Stock</div>
              </div>
>>>>>>> origin/main
            </div>
          </div>
        </div>

<<<<<<< HEAD
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
=======
      {/* Search & Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
              type="text"
              placeholder="Search products or suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0f0f0f] border border-neutral-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#0f0f0f] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? " All Categories" : cat}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#0f0f0f] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
          >
            <option value="trending"> Trending</option>
            <option value="price-low"> Price: Low to High</option>
            <option value="rating"> Top Rated</option>
          </select>
        </div>
      </div>

      {/* Products List */}
      <div className="space-y-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#0f0f0f] border border-neutral-800 rounded-lg p-4 hover:border-emerald-500/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                {/* Icon & Name */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg flex items-center justify-center text-4xl border border-neutral-700 group-hover:border-emerald-500/30 transition-colors">
                    {product.icon}
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {product.name}
                    </h3>
                    {product.trending && (
                      <span className="flex items-center gap-1 text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </span>
                    )}
                    {product.certified && (
                      <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                        <Award className="w-3 h-3" />
                        Certified
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-400 mb-2">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-neutral-500">
                      <span className="text-white font-semibold">
                        {product.supplier}
                      </span>
                    </span>
                    <span className="text-neutral-600"></span>
                    <span className="text-emerald-500 font-semibold">
                      {product.category}
                    </span>
                    <span className="text-neutral-600"></span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3" />
                      ))}
                      <span className="text-neutral-400 ml-1">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stock & Price */}
                <div className="flex-shrink-0 text-right">
                  <div className="text-2xl font-black text-emerald-400 mb-1"></div>
                  <div className="text-xs text-neutral-500 mb-3">
                    {product.unit}
                  </div>
                  <div className="bg-neutral-900 rounded px-3 py-1 mb-3">
                    <div className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span className="text-sm font-semibold text-white">
                        {product.stock}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-500">in stock</div>
                  </div>
                </div>

                {/* Action Button */}
                <button className="flex-shrink-0 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg flex items-center gap-2 transition-colors ml-4">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">Buy</span>
                </button>
              </div>
>>>>>>> origin/main
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-neutral-400 mb-2">
              No products found
            </h3>
            <p className="text-neutral-500">
              Try adjusting your search or filters
            </p>
          </div>
<<<<<<< HEAD
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
=======
        )}
      </div>
>>>>>>> origin/main
    </div>
  );
};

export default Marketplace;
