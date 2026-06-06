import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

export const config = {
  port: process.env.PORT || 5000,
  googleSafeBrowsingApiKey: process.env.GOOGLE_SAFE_BROWSING_API_KEY,
  openRouterApiKey: process.env.OPENROUTER_API_KEY,
  nodeEnv: process.env.NODE_ENV || 'development'
};

if (!config.googleSafeBrowsingApiKey) {
  console.warn("WARNING: GOOGLE_SAFE_BROWSING_API_KEY is not set in environment variables.");
}
