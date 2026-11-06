/**
 * Định nghĩa Địa điểm Di tích / Bảo tàng / Không gian văn hóa
 */
export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface HeritageSite {
  id: string;
  name: string;                // Tên di tích (vd: Bảo tàng Lịch sử Quốc gia)
  address: string;             // Địa chỉ chi tiết
  coordinates: GeoCoordinates; // Tọa độ hiển thị Marker trên React Native Maps
  description: string;         // Tóm tắt di tích
  coverImage: string;          // Ảnh đại diện
  gallery?: string[];          // Thư viện ảnh
  openingHours?: string;       // Giờ mở cửa (vd: 08:00 - 17:00)
  ticketPrice?: string;        // Giá vé tham quan
  phone?: string;
  featuredArtifactIds?: string[]; // Danh sách ID hiện vật tiêu biểu tại di tích
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateHeritageSiteDTO extends Omit<HeritageSite, 'id' | 'createdAt' | 'updatedAt'> {}
export interface UpdateHeritageSiteDTO extends Partial<CreateHeritageSiteDTO> {}
