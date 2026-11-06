import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  firebase: {
    serviceAccountPath: process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './serviceAccountKey.json',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
  },
  aiServiceUrl: process.env.AI_SERVICE_URL || 'http://localhost:8000',
  ttsApiKey: process.env.TTS_API_KEY || '',
};
