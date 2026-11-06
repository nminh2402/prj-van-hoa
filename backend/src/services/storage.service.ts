import { storage } from '../config/firebase';

export class StorageService {
  /**
   * Upload buffer lên Firebase Storage (ảnh hiện vật hoặc file audio)
   */
  static async uploadFile(
    fileBuffer: Buffer,
    originalName: string,
    folder: 'artifacts' | 'audio' | 'sites' = 'artifacts',
    contentType?: string
  ): Promise<string> {
    const bucket = storage.bucket();
    const extension = originalName.split('.').pop() || 'dat';
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
    const file = bucket.file(filename);

    await file.save(fileBuffer, {
      metadata: {
        contentType: contentType || 'application/octet-stream',
      },
      public: true,
    });

    // Tạo public URL hoặc Signed URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
    return publicUrl;
  }
}
