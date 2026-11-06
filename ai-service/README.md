# 🧠 AI Service - Nhận diện Hiện vật Văn hóa bằng YOLO

Microservice phát hiện và nhận diện hiện vật di sản văn hóa qua ảnh chụp camera bằng mô hình Computer Vision (YOLOv8 / YOLOv11).

## 🚀 Khởi chạy nhanh

### 1. Cài đặt môi trường Python
```bash
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
```

### 2. Thêm file trọng số Model
Sau khi train mô hình YOLO trên tập dữ liệu hiện vật văn hóa (qua Google Colab / Kaggle / Ultralytics):
1. Copy file `best.pt` vào thư mục `app/models/best.pt`.
2. Cập nhật nhãn lớp (class labels) trong `app/models/labels.json`.

*(Ghi chú: Nếu chưa có file `best.pt`, hệ thống sẽ tự động bật Mock Mode để phục vụ việc test giao diện và luồng dữ liệu).*

### 3. Chạy Server
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
- API Docs (Swagger UI): `http://localhost:8000/docs`
- Endpoint nhận diện: `POST http://localhost:8000/api/v1/predict` (multipart/form-data với field `file`)
