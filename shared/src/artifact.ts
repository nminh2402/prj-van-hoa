/**
 * Định nghĩa thông tin Hiện vật Văn hóa / Di sản
 */
export interface CulturalArtifact {
  id: string;
  name: string;                // Tên hiện vật (vd: Trống đồng Ngọc Lũ)
  code: string;                // Mã định danh tương ứng nhãn YOLO (vd: TRONG_DONG_NGOC_LU)
  category: string;            // Danh mục (Đồ đồng, Gốm sứ, Điêu khắc đá, v.v.)
  epoch: string;               // Thời kỳ / Niên đại (vd: Văn hóa Đông Sơn, TK VII TCN)
  originLocation: string;      // Nơi phát hiện / Xuất xứ
  currentLocationId?: string;  // ID di tích/bảo tàng đang lưu giữ
  description: string;         // Mô tả chi tiết lịch sử, hoa văn, ý nghĩa
  images: string[];            // Danh sách URL ảnh (lưu trên Firebase Storage)
  audioGuideUrl?: string;      // URL file âm thanh thuyết minh (Firebase Storage)
  audioDurationSeconds?: number;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateArtifactDTO extends Omit<CulturalArtifact, 'id' | 'createdAt' | 'updatedAt'> {}
export interface UpdateArtifactDTO extends Partial<CreateArtifactDTO> {}
