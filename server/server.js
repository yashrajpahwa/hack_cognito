/**
 * Sell Waste Today API Server
 * 
 * A layered intelligence system for waste liquidation.
 * This implementation uses deterministic placeholders that will be replaced
 * with LLMs and optimization engines.
 */

const express = require('express');
const cors = require('cors');
const sellWasteRouter = require('./routes/sellWaste');
const insightsRouter = require('./routes/insights');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const configuredOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173').split(',').map((origin) => origin.trim()).filter(Boolean);

const isLocalhostOrigin = (origin) => {
  if (!origin) return false;
  try {
    const parsed = new URL(origin);
    return ['localhost', '127.0.0.1', '0.0.0.0'].includes(parsed.hostname);
  } catch {
    return origin.includes('localhost') || origin.includes('127.0.0.1');
  }
};

// Middleware
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || configuredOrigins.includes(origin) || isLocalhostOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api', sellWasteRouter);
app.use('/api', insightsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'sell-waste-today'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    path: req.path
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log('='.repeat(50));
  console.log('Sell Waste Today API');
  console.log('='.repeat(50));
  console.log(`Server running on ${HOST}:${PORT}`);
  console.log(`Health check: http://${HOST}:${PORT}/health`);
  console.log(`API endpoint: POST http://${HOST}:${PORT}/api/sell-waste-today`);
  console.log('='.repeat(50));
});

module.exports = app;
