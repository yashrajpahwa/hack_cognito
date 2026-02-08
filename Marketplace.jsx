import React, { useState } from "react";
import {
  ShoppingCart,
  Star,
  Filter,
  Search,
  Package,
  TrendingUp,
  Award,
  Check,
  Zap,
  Barcode,
  DollarSign,
} from "lucide-react";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("trending");

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

  const categories = [
    "all",
    "Raw Materials",
    "Metals",
    "Biomass",
    "Components",
    "Electronics",
    "Polymers",
    "Construction",
  ];

  let filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            </div>
          </div>
        </div>
      </div>

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
        )}
      </div>
    </div>
  );
};

export default Marketplace;
