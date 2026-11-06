import os
import json
from pathlib import Path
from typing import List, Dict, Any
from PIL import Image
import io

class ArtifactDetector:
    def __init__(self, model_path: str = "app/models/best.pt"):
        self.model_path = model_path
        self.labels = self._load_labels()
        self.model = None
        self._init_model()

    def _load_labels(self) -> Dict[str, str]:
        labels_path = Path("app/models/labels.json")
        if labels_path.exists():
            with open(labels_path, "r", encoding="utf-8") as f:
                return json.load(f)
        return {}

    def _init_model(self):
        # Kiểm tra file weights của mô hình YOLO
        if os.path.exists(self.model_path):
            try:
                from ultralytics import YOLO
                self.model = YOLO(self.model_path)
                print(f"✅ Tải thành công mô hình YOLO từ {self.model_path}")
            except Exception as e:
                print(f"⚠️ Lỗi khi nạp YOLO model: {e}")
                self.model = None
        else:
            print(f"ℹ️ Chưa tìm thấy trọng số {self.model_path}. Chế độ mô phỏng (Mock mode) đang bật để test hệ thống.")

    def detect(self, image_bytes: bytes) -> List[Dict[str, Any]]:
        # Mở ảnh từ buffer
        image = Image.open(io.BytesIO(image_bytes))
        width, height = image.size

        if self.model is not None:
            # Inference thực tế bằng YOLO
            results = self.model(image)
            detections = []
            for r in results:
                for box in r.boxes:
                    cls_id = int(box.cls[0].item())
                    label_key = r.names[cls_id]
                    display_name = self.labels.get(label_key, label_key)
                    conf = float(box.conf[0].item())
                    xywh = box.xywh[0].tolist()

                    detections.append({
                        "label": label_key,
                        "displayName": display_name,
                        "confidence": round(conf, 2),
                        "bbox": {
                            "x": round(xywh[0] - xywh[2]/2),
                            "y": round(xywh[1] - xywh[3]/2),
                            "width": round(xywh[2]),
                            "height": round(xywh[3])
                        }
                    })
            return detections
        else:
            # Mock Detection: Trả kết quả mẫu khi chưa train/đặt trọng số weights
            return [
                {
                    "label": "TRONG_DONG_DONG_SON",
                    "displayName": "Trống Đồng Đông Sơn",
                    "confidence": 0.95,
                    "bbox": {
                        "x": int(width * 0.15),
                        "y": int(height * 0.15),
                        "width": int(width * 0.7),
                        "height": int(height * 0.7)
                    }
                }
            ]

# Singleton instance
detector = ArtifactDetector()
