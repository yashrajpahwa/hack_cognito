# Sell Waste Today API

An intelligent waste liquidation system with layered architecture designed for future AI integration.

## Architecture

This API implements a hollow intelligence system with clear architectural seams:

### Layer 1: Global Context Intelligence Agent
- **File**: `services/globalContextAgent.js`
- **Purpose**: Understands global supply/demand, logistics capacity, waste hotspots, and sustainability factors
- **Current State**: Deterministic placeholder
- **Future**: LLM-powered market intelligence

### Layer 2: Personalized Decision Agent
- **File**: `services/personalizedDecisionAgent.js`
- **Purpose**: Adapts decisions based on company profile, risk appetite, and historical behavior
- **Current State**: Deterministic placeholder
- **Future**: ML-powered personalization engine

### Optimization Layer
- **File**: `services/optimizer.js`
- **Purpose**: Combines Layer 1 & 2 outputs to optimize profit, pooling, and routing
- **Current State**: Deterministic mock routes
- **Future**: VRP solver and profit maximization engine

## Installation

```bash
npm install
```

## Environment

- Copy `server/.env.example` to `server/.env`.
- Set `GEMINI_API_KEY` if you want Gemini-powered context/personalization (default deterministic fallbacks do not require it).
- Set `PORT`/`HOST` if you need to avoid occupied ports (defaults: `3000` + `0.0.0.0`).

## Running the Server

```bash
npm start
```

Server will start on port 3000 (configurable via PORT environment variable).

## API Endpoint

### POST /api/sell-waste-today

Request a same-day waste pickup with intelligent routing.

#### Request Body

```json
{
  "companyId": "COMPANY123",
  "companySize": "SME",
  "industry": "retail",
  "riskAppetite": "cost",
  "wasteItems": [
    {
      "material": "cardboard",
      "quantity": 500,
      "unit": "kg",
      "location": {
        "lat": 40.7128,
        "lon": -74.0060,
        "address": "123 Main St, New York, NY"
      }
    }
  ]
}
```

#### Validation Rules

- `companyId`: Required
- `wasteItems`: Required, must be non-empty array
- `companySize`: Optional, must be "SME" or "enterprise"
- `industry`: Optional, must be one of: retail, pharma, FMCG, manufacturing, other
- `riskAppetite`: Optional, must be one of: cost, reliability, sustainability

#### Response (200 OK)

```json
{
  "requestId": "REQ-1234567890-abc123",
  "status": "completed",
  "messages": [
    {
      "layer": "layer1",
      "title": "Layer 1: Global Context Intelligence Agent",
      "text": "Getting layer 1 global context. Managing global supply and demand signals, logistics capacity, waste hotspots, and sustainability factors.",
      "timestamp": "2024-01-15T10:30:00.000Z"
    },
    {
      "layer": "layer2",
      "title": "Layer 2: Personalized Decision Agent",
      "text": "Adapting decisions based on company size, risk appetite, industry, and historical behavior.",
      "timestamp": "2024-01-15T10:30:00.100Z"
    },
    {
      "layer": "optimization",
      "title": "Optimization and Pooling",
      "text": "Optimizing for profit and pooling. Generating pickup route and carrier allocation.",
      "timestamp": "2024-01-15T10:30:00.200Z"
    },
    {
      "layer": "final",
      "title": "Pickup Scheduled",
      "text": "Pickup will happen today.",
      "timestamp": "2024-01-15T10:30:00.300Z"
    }
  ],
  "pickup": {
    "scheduled": true,
    "date": "2024/01/15",
    "route": {
      "routeId": "ROUTE-1234567890-xyz789",
      "etaMinutes": 90,
      "stops": [
        {
          "address": "123 Main St, New York, NY",
          "expectedQuantity": 500
        }
      ]
    }
  }
}
```

#### Error Response (400 Bad Request)

```json
{
  "error": "Validation failed",
  "reasons": [
    "companyId is required",
    "wasteItems must be a non-empty array"
  ]
}
```

## Example Usage

### Using curl

```bash
curl -X POST http://localhost:3000/api/sell-waste-today \
  -H "Content-Type: application/json" \
  -d '{
    "companyId": "ACME-CORP",
    "companySize": "enterprise",
    "industry": "manufacturing",
    "riskAppetite": "sustainability",
    "wasteItems": [
      {
        "material": "metal scrap",
        "quantity": 2.5,
        "unit": "tons",
        "location": {
          "lat": 51.5074,
          "lon": -0.1278,
          "address": "Industrial Park, London, UK"
        }
      }
    ]
  }'
```

### Using JavaScript (fetch)

```javascript
const response = await fetch('http://localhost:3000/api/sell-waste-today', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    companyId: 'RETAIL-XYZ',
    companySize: 'SME',
    industry: 'retail',
    riskAppetite: 'cost',
    wasteItems: [
      {
        material: 'plastic packaging',
        quantity: 150,
        unit: 'kg',
        location: {
          lat: 48.8566,
          lon: 2.3522,
          address: '10 Rue de Paris, France'
        }
      }
    ]
  })
});

const result = await response.json();
console.log(result);
```

## Health Check

```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "sell-waste-today"
}
```

## Insights Endpoints

- `GET /api/insights/metrics` – aggregated industry, city, and material stats consumed by the analytics dashboards.
- `GET /api/insights/companies` – paginated company summaries with calculated waste volume (kg) useful for the data center UI.

Default CORS allowlist: `http://localhost:5173` and `http://127.0.0.1:5173`, plus any origin whose hostname is `localhost`, `127.0.0.1`, or `0.0.0.0`. Override (or extend) the list with `CORS_ORIGINS` (comma-separated) if you host the UI or another client elsewhere.

## Extension Points

Each service file contains TODO comments marking where LLMs and optimization engines will be integrated:

```javascript
// TODO: Replace this placeholder with LLM or optimization engine
```

These markers indicate clear architectural seams for future AI integration.

## Design Principles

1. **Deterministic**: Same input always produces same structure
2. **No Dependencies**: No database or external APIs required
3. **Pure JSON**: Clean input/output interface
4. **Layered**: Clear separation of concerns
5. **Extensible**: Obvious integration points for future intelligence
