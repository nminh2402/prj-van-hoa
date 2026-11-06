import multer from 'multer';

// Sử dụng MemoryStorage để xử lý ảnh trực tiếp trong RAM rồi đẩy lên Firebase Storage / AI
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB tối đa
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ chấp nhận file định dạng hình ảnh hoặc âm thanh'));
    }
  },
});
