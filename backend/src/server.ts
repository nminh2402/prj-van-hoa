import app from './app';
import { env } from './config/env';
import { logger } from './utils/logger';

const PORT = env.port;

app.listen(PORT, () => {
  logger.info(`🚀 Server Backend Văn Hóa đang chạy tại http://localhost:${PORT}`);
  logger.info(`📡 API Health Check: http://localhost:${PORT}/api/v1/health`);
});
