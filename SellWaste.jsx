import React, { useState, useEffect } from "react";
import { Truck, AlertCircle, CheckCircle, Loader, Wifi, WifiOff } from "lucide-react";
import { API_BASE_URL } from "./config";

const SellWaste = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [apiConnected, setApiConnected] = useState(null);
  const [formData, setFormData] = useState({
    companyId: "COMPANY-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    companySize: "SME",
    industry: "manufacturing",
    riskAppetite: "sustainability",
    wasteItems: [{
      material: "metal scrap",
      quantity: 500,
      unit: "kg",
      location: { lat: 40.7128, lon: -74.006, address: "123 Main St, New York, NY" }
    }]
  });

  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, { method: "GET" });
      setApiConnected(response.ok);
    } catch (err) {
      setApiConnected(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWasteItemChange = (index, field, value) => {
    const newItems = [...formData.wasteItems];
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      newItems[index][parent] = { ...newItems[index][parent], [child]: value };
    } else {
      newItems[index][field] = value;
    }
    setFormData(prev => ({ ...prev, wasteItems: newItems }));
  };

  const addWasteItem = () => {
    setFormData(prev => ({
      ...prev,
      wasteItems: [...prev.wasteItems, {
        material: "",
        quantity: 100,
        unit: "kg",
        location: { lat: 0, lon: 0, address: "" }
      }]
    }));
  };

  const removeWasteItem = (index) => {
    setFormData(prev => ({
      ...prev,
      wasteItems: prev.wasteItems.filter((_, i) => i !== index)
    }));
  };

  const submitRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/sell-waste-today`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const text = await response.text();
        try {
          const errorData = JSON.parse(text);
          throw new Error(errorData.error || "API request failed");
        } catch (e) {
          throw new Error("API Error: " + response.status + " " + response.statusText);
        }
      }

      const text = await response.text();
      if (!text) {
        throw new Error("API returned empty response. Check if Sell Waste API is running on port 3000.");
      }

      const data = JSON.parse(text);
      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to submit waste pickup request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Truck className="w-8 h-8 text-emerald-500" />
          <h1 className="text-3xl font-bold text-white">Sell Waste Today</h1>
          <div className="ml-auto flex items-center gap-2">
            {apiConnected === true && (
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-800 rounded-lg">
                <Wifi className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-medium text-emerald-400">API Connected</span>
              </div>
            )}
            {apiConnected === false && (
              <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-800 rounded-lg">
                <WifiOff className="w-4 h-4 text-red-400" />
                <span className="text-xs font-medium text-red-400">API Offline</span>
              </div>
            )}
          </div>
        </div>

        {!apiConnected && (
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 mb-8">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-200 font-medium mb-2">Sell Waste API is not running</p>
                <p className="text-red-300 text-sm mb-3">The API backend needs to be running on <code className="bg-red-950 px-2 py-1 rounded">localhost:3000</code> to process waste pickup requests.</p>
                <p className="text-red-300 text-sm">Start the Sell Waste API with:</p>
                <code className="bg-red-950 px-3 py-2 rounded text-red-200 text-sm block mt-2">npm install && npm start</code>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 shadow-xl">
              <form onSubmit={submitRequest} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Company ID</label>
                    <input type="text" name="companyId" value={formData.companyId} onChange={handleInputChange} className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Company Size</label>
                    <select name="companySize" value={formData.companySize} onChange={handleInputChange} className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500">
                      <option>SME</option>
                      <option>enterprise</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Industry</label>
                    <select name="industry" value={formData.industry} onChange={handleInputChange} className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500">
                      <option>retail</option>
                      <option>pharma</option>
                      <option>FMCG</option>
                      <option>manufacturing</option>
                      <option>other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Risk Appetite</label>
                    <select name="riskAppetite" value={formData.riskAppetite} onChange={handleInputChange} className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500">
                      <option>cost</option>
                      <option>reliability</option>
                      <option>sustainability</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-neutral-800 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Waste Items</h3>
                  <div className="space-y-4">
                    {formData.wasteItems.map((item, idx) => (
                      <div key={idx} className="bg-neutral-800/50 rounded-lg p-4 border border-neutral-700">
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <input type="text" placeholder="Material" value={item.material} onChange={(e) => handleWasteItemChange(idx, "material", e.target.value)} className="px-3 py-2 bg-neutral-700 border border-neutral-600 rounded text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-emerald-500" />
                          <div className="flex gap-2">
                            <input type="number" placeholder="Qty" value={item.quantity} onChange={(e) => handleWasteItemChange(idx, "quantity", parseFloat(e.target.value))} className="flex-1 px-3 py-2 bg-neutral-700 border border-neutral-600 rounded text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-emerald-500" />
                            <select value={item.unit} onChange={(e) => handleWasteItemChange(idx, "unit", e.target.value)} className="px-3 py-2 bg-neutral-700 border border-neutral-600 rounded text-white text-sm focus:outline-none focus:border-emerald-500">
                              <option>kg</option>
                              <option>tons</option>
                              <option>liters</option>
                              <option>units</option>
                            </select>
                          </div>
                        </div>
                        <input type="text" placeholder="Address" value={item.location.address} onChange={(e) => handleWasteItemChange(idx, "location.address", e.target.value)} className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-emerald-500 mb-2" />
                        {formData.wasteItems.length > 1 && (
                          <button type="button" onClick={() => removeWasteItem(idx)} className="text-red-400 hover:text-red-300 text-sm font-medium">Remove Item</button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addWasteItem} className="w-full px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-emerald-400 font-medium transition-colors">+ Add Waste Item</button>
                  </div>
                </div>

                <button type="submit" disabled={loading || !apiConnected} className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-neutral-600 disabled:to-neutral-700 text-white font-bold rounded-lg transition-all shadow-lg disabled:shadow-none flex items-center justify-center gap-2">
                  {loading ? (<><Loader className="w-5 h-5 animate-spin" /> Processing...</>) : (<><Truck className="w-5 h-5" /> Request Pickup</>)}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            {error && (
              <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 flex gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            {result && (
              <div className="bg-emerald-900/10 border border-emerald-800 rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-bold text-emerald-400">Pickup Scheduled!</h3>
                </div>

                {result.messages && (
                  <div className="space-y-3">
                    {result.messages.map((msg, idx) => (
                      <div key={idx} className="bg-neutral-800/50 rounded p-3 border border-emerald-800/30">
                        <p className="text-xs font-bold text-emerald-400 uppercase mb-1">{msg.title}</p>
                        <p className="text-xs text-neutral-300">{msg.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {result.pickup && (
                  <div className="bg-neutral-800/50 rounded p-3 border border-emerald-800/30 mt-4">
                    <p className="text-sm font-bold text-white mb-2">Pickup Details</p>
                    <div className="text-xs space-y-1 text-neutral-300">
                      <p><span className="text-emerald-400">Date:</span> {result.pickup.date}</p>
                      {result.pickup.route && (
                        <>
                          <p><span className="text-emerald-400">ETA:</span> {result.pickup.route.etaMinutes} minutes</p>
                          <p><span className="text-emerald-400">Route ID:</span> {result.pickup.route.routeId}</p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {!result && !error && (
              <div className="bg-neutral-800/30 rounded-lg border border-neutral-700 p-6 text-center">
                <Truck className="w-12 h-12 text-neutral-700 mx-auto mb-3" />
                <p className="text-neutral-400 text-sm">Submit a waste pickup request to see results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellWaste;
