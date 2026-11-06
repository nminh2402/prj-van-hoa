import * as admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';
import { env } from './env';

let db: admin.firestore.Firestore;
let storage: admin.storage.Storage;
let auth: admin.auth.Auth;

try {
  const serviceAccountKeyPath = path.resolve(process.cwd(), env.firebase.serviceAccountPath);

  if (fs.existsSync(serviceAccountKeyPath)) {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountKeyPath, 'utf8'));

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: env.firebase.storageBucket || `${serviceAccount.project_id}.appspot.com`,
    });

    console.log('✅ Firebase Admin SDK khởi tạo thành công với Service Account.');
  } else {
    // Dự phòng khi chưa có file key (cho dev/staging hoặc default credentials)
    admin.initializeApp({
      storageBucket: env.firebase.storageBucket,
    });
    console.warn('⚠️ Chưa tìm thấy serviceAccountKey.json. Đang khởi tạo Firebase bằng cấu hình mặc định.');
  }

  db = admin.firestore();
  storage = admin.storage();
  auth = admin.auth();
} catch (error) {
  console.error('❌ Lỗi khi khởi tạo Firebase Admin SDK:', error);
  // Khởi tạo app rỗng để tránh crash khi chưa kết nối
  if (!admin.apps.length) {
    admin.initializeApp();
  }
  db = admin.firestore();
  storage = admin.storage();
  auth = admin.auth();
}

export { admin, db, storage, auth };
