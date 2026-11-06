/**
 * Định nghĩa kết quả nhận diện hiện vật từ mô hình Computer Vision (YOLO)
 */
export interface BoundingBox {
  x: number;      // Tọa độ góc trên bên trái x
  y: number;      // Tọa độ góc trên bên trái y
  width: number;  // Chiều rộng hộp nhận diện
  height: number; // Chiều cao hộp nhận diện
}

export interface DetectionResult {
  label: string;               // Nhãn nhận diện (vd: TRONG_DONG_DONG_SON)
  displayName: string;         // Tên tiếng Việt hiển thị
  confidence: number;          // Độ tin cậy (0.0 -> 1.0)
  bbox: BoundingBox;           // Khung bao hiện vật
  artifactId?: string;         // ID hiện vật tương ứng trong Firestore (nếu đã map)
}

export interface AiInferenceResponse {
  success: boolean;
  inferenceTimeMs: number;
  detections: DetectionResult[];
}
