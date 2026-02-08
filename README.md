<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1o1zdbtFhDANYVcWduTSNfU0VoRmZenXg

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Sell Waste Today API

This repo now bundles the Sell Waste Today Express API under `server/`.

### Local setup

1. After installing front-end deps (`npm install`), go into `server/` and install there as well:
   ```bash
   cd server
   npm install
   ```
2. Copy `server/.env.example` to `server/.env` and provide your `GEMINI_API_KEY` if you want real LLM responses (deterministic fallbacks are available inline otherwise).

### Running the services

- `npm run dev` → only the Vite app
- `npm run server` → only the Express API
- `npm start` → runs both in parallel via `concurrently --kill-others-on-fail`

The API listens on port 3000 by default and exposes `POST /api/sell-waste-today` plus a health endpoint at `/health`. See `server/README.md` for more details.
