export const logger = {
  info: (message) => console.log(`[INFO] ${new Date().toISOString()} - ${message}`),
  error: (message, err) => console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, err || ''),
  warn: (message) => console.warn(`[WARN] ${new Date().toISOString()} - ${message}`),
};
