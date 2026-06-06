import app from './app.js';
import { config } from './config/env.js';
import { logger } from './utils/logger.js';

app.listen(config.port, () => {
  logger.info(`Server is running in ${config.nodeEnv} mode on port ${config.port}`);
});
