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

