import React, { useState } from "react";
import {
  ShoppingCart,
  Star,
  Filter,
  Search,
  Package,
  TrendingUp,
  Award,
} from "lucide-react";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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
      image: "",
      trending: true,
      description:
        "High-quality industrial cotton surplus from certified manufacturers",
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
      image: "",
      certified: true,
      description: "Premium recycled steel with 99.5% purity rating",
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
      image: "",
      description: "Sustainable biomass material perfect for energy generation",
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
      image: "",
      certified: true,
      trending: true,
      description: "Ultra-clear optical glass for precision manufacturing",
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
      image: "",
      description: "High-grade silicon scrap suitable for recycling",
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
      image: "",
      trending: true,
      description: "Food-grade recycled plastic pellets, mixed colors",
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
      image: "",
      description: "Clean ash aggregate for construction applications",
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
      image: "",
      description: "Natural wool fiber waste for insulation manufacturing",
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

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Marketplace</h1>
            <p className="text-neutral-400">
              Circular economy trading platform
            </p>
          </div>
          <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white font-medium flex items-center gap-2 transition-colors">
            <Package className="w-5 h-5" />
            List Product
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#0f0f0f] border border-neutral-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {products.length}
                </div>
                <div className="text-xs text-neutral-500">Active Listings</div>
              </div>
            </div>
          </div>
          <div className="bg-[#0f0f0f] border border-neutral-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">\K</div>
                <div className="text-xs text-neutral-500">Avg Market Value</div>
              </div>
            </div>
          </div>
          <div className="bg-[#0f0f0f] border border-neutral-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {products.filter((p) => p.certified).length}
                </div>
                <div className="text-xs text-neutral-500">
                  Certified Products
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#0f0f0f] border border-neutral-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {products.reduce((sum, p) => sum + p.stock, 0)}
                </div>
                <div className="text-xs text-neutral-500">Units in Stock</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
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
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-neutral-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#0f0f0f] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none min-w-[200px]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#0f0f0f] border border-neutral-800 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] group"
          >
            {/* Product Image */}
            <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 h-48 flex items-center justify-center">
              <div className="text-6xl">{product.image}</div>
              {product.trending && (
                <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </div>
              )}
              {product.certified && (
                <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Certified
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="mb-2">
                <span className="text-xs text-emerald-500 font-semibold">
                  {product.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                {product.name}
              </h3>
              <p className="text-xs text-neutral-500 mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={"w-3 h-3"} />
                  ))}
                </div>
                <span className="text-xs text-neutral-400">
                  {product.rating}
                </span>
              </div>

              <div className="flex items-center justify-between mb-3 pb-3 border-b border-neutral-800">
                <div>
                  <div className="text-2xl font-bold text-white">\</div>
                  <div className="text-xs text-neutral-500">{product.unit}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-neutral-300">
                    {product.stock} units
                  </div>
                  <div className="text-xs text-neutral-500">in stock</div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="text-xs text-neutral-500">
                  by{" "}
                  <span className="text-neutral-300 font-medium">
                    {product.supplier}
                  </span>
                </div>
              </div>

              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
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
  );
};

export default Marketplace;
