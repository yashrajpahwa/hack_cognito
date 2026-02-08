const fs = require("fs");
const path = require("path");

let cachedDataset = null;

function loadDataset() {
  if (cachedDataset) return cachedDataset;
  const datasetPath = path.join(__dirname, "..", "indian_waste_management_dataset.json");
  const raw = fs.readFileSync(datasetPath, "utf8");
  cachedDataset = JSON.parse(raw);
  return cachedDataset;
}

module.exports = {
  loadDataset,
};
