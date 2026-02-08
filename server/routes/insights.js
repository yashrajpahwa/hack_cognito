const express = require("express");
const { loadDataset } = require("../utils/datasetLoader");

const router = express.Router();

const UNIT_CONVERSIONS = [
  { match: "ton", factor: 1000 },
  { match: "t", factor: 1000 },
  { match: "kg", factor: 1 },
];

function toKg(item) {
  if (!item || typeof item.quantity !== "number") {
    return 0;
  }

  const unit = (item.unit || "").toLowerCase();
  const base = UNIT_CONVERSIONS.find((entry) => unit.includes(entry.match));
  const factor = base ? base.factor : 1;
  return item.quantity * factor;
}

function buildMetrics(companies) {
  const industryCounts = {};
  const cityCounts = {};
  const materialCounts = {};
  const riskCounts = {};
  let totalWaste = 0;

  companies.forEach((company) => {
    const industry = company.industry || "other";
    const city = company.city || "unknown";
    const risk = company.riskAppetite || "balanced";

    industryCounts[industry] = (industryCounts[industry] || 0) + 1;
    cityCounts[city] = (cityCounts[city] || 0) + 1;
    riskCounts[risk] = (riskCounts[risk] || 0) + 1;

    const wasteItems = Array.isArray(company.wasteItems) ? company.wasteItems : [];
    wasteItems.forEach((item) => {
      const quantity = toKg(item);
      totalWaste += quantity;
      const material = (item.material || "mixed").toLowerCase();
      materialCounts[material] = (materialCounts[material] || 0) + quantity;
    });
  });

  const sortedMaterialsWithVolumes = Object.entries(materialCounts)
    .sort((a, b) => b[1] - a[1]);
  const sortedMaterials = sortedMaterialsWithVolumes.map(([material]) => material);

  const sortedCities = Object.entries(cityCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([city, count]) => ({ city, count }))
    .slice(0, 4);

  const topIndustry = Object.entries(industryCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || "mixed";

  const topRiskAppetite = Object.entries(riskCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || "balanced";

  return {
    totalCompanies: companies.length,
    totalWaste,
    avgWastePerCompany: companies.length ? totalWaste / companies.length : 0,
    industryCounts,
    cityCounts,
    topIndustry,
    topMaterials: sortedMaterials.slice(0, 5),
    topMaterialStats: sortedMaterialsWithVolumes.slice(0, 5).map(([material, volume]) => ({
      material,
      volume,
    })),
    topCities: sortedCities,
    topRiskAppetite,
  };
}

function summarizeCompanies(companies) {
  return companies.slice(0, 12).map((company) => {
    const wasteVolume = (company.wasteItems || []).reduce(
      (sum, item) => sum + toKg(item),
      0,
    );

    return {
      companyId: company.companyId,
      companyName: company.companyName,
      industry: company.industry,
      city: company.city,
      state: company.state,
      riskAppetite: company.riskAppetite,
      wasteVolume,
    };
  });
}

router.get("/insights/metrics", (req, res) => {
  try {
    const dataset = loadDataset();
    const companies = Array.isArray(dataset.companies) ? dataset.companies : [];
    const metrics = buildMetrics(companies);
    res.json({ metrics });
  } catch (error) {
    console.error("Metrics error:", error);
    res.status(500).json({ error: "Unable to build metrics" });
  }
});

router.get("/insights/companies", (req, res) => {
  try {
    const dataset = loadDataset();
    const companies = Array.isArray(dataset.companies) ? dataset.companies : [];
    res.json({ companies: summarizeCompanies(companies) });
  } catch (error) {
    console.error("Companies error:", error);
    res.status(500).json({ error: "Unable to load company data" });
  }
});

module.exports = router;
