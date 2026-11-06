# 🏛️ NỀN TẢNG DI SẢN VĂN HÓA VIỆT NAM (CULTURE HERITAGE PLATFORM)

Hệ thống ứng dụng di động đa nền tảng và dịch vụ đám mây phục vụ việc số hóa, quảng bá, bảo tồn và nâng cao trải nghiệm tham quan di sản văn hóa Việt Nam.

---

## 🛠️ CÔNG NGHỆ DỰ KIẾN SỬ DỤNG

Dự án được thiết kế theo kiến trúc hiện đại, phân tách rõ ràng giữa Mobile App, Backend API và Microservice AI:

### 1. Cơ sở dữ liệu & Lưu trữ (Database & Cloud Storage)
- **Hệ sinh thái Firebase (Firebase Ecosystem)**:
  - **Cloud Firestore**: Cơ sở dữ liệu NoSQL dạng tài liệu (Document-based), lưu trữ linh hoạt thông tin hiện vật, điểm di tích, danh mục, niên đại, tọa độ GPS và thẻ phân loại với khả năng đồng bộ thời gian thực (Realtime) và hỗ trợ lưu đệm ngoại tuyến (Offline Persistence).
  - **Firebase Storage**: Dịch vụ lưu trữ đám mây an toàn, tốc độ cao cho các tệp đa phương tiện dung lượng lớn như hình ảnh hiện vật độ phân giải cao và các tệp âm thanh thuyết minh (`.mp3`).

### 2. Backend (RESTful API Server)
- **Runtime & Ngôn ngữ**: **Node.js** kết hợp ngôn ngữ **TypeScript** giúp định kiểu tĩnh chặt chẽ (Static Typing), hạn chế tối đa lỗi runtime và tăng năng suất bảo trì mã nguồn.
- **Framework**: **Express.js** (hỗ trợ mở rộng lên **NestJS**) đóng vai trò xử lý định tuyến (routing), áp dụng kiến trúc phân tầng (Controller - Service - Middleware) và giải quyết logic nghiệp vụ.
- **Firebase Admin SDK**: Tương tác và truy vấn trực tiếp với Cloud Firestore, Storage và Authentication từ phía server với quyền quản trị bảo mật cao nhất, kiểm soát chặt chẽ quyền truy cập dữ liệu và ẩn hoàn toàn secret key khỏi client.
- **Multer**: Xử lý dữ liệu đa phương tiện tải lên (upload file hình ảnh camera) trực tiếp trong bộ nhớ đệm (MemoryStorage) để tối ưu hiệu năng chuyển tiếp.

### 3. Mobile App (Frontend)
- **Nền tảng**: **React Native** (kết hợp **TypeScript**).
  - *Ưu điểm*: Phát triển đa nền tảng (Cross-platform), một mã nguồn duy nhất có thể build ra cả bản cài đặt Android (`.apk`/`.aab`) và iOS (`.ipa`), giúp tối ưu hóa chi phí và rút ngắn thời gian phát triển nhưng vẫn đạt hiệu năng gần tương đương ứng dụng gốc (Near-native performance).
- **Thư viện & Công cụ tích hợp chuyên sâu**:
  - **Axios**: Khách hàng HTTP mạnh mẽ để gọi và xử lý dữ liệu API mượt mà, cấu hình interceptor tự động gắn token bảo mật và xử lý lỗi tập trung.
  - **React Native Maps**: Hiển thị bản đồ văn hóa tương tác cao, xử lý tọa độ địa lý (GPS) và ghim các điểm di tích bằng Marker tùy biến cùng thẻ xem trước Callout.
  - **React Native Vision Camera**: Quản lý luồng hình ảnh từ camera thiết bị với hiệu năng cao, chụp ảnh độ nét tối đa để đẩy dữ liệu lên mô hình AI xử lý.
  - **Thuyết minh tự động (Audio Guide)**: 
    - Tích hợp thư viện phát âm thanh chuyên dụng (`react-native-sound` / `react-native-track-player`) hỗ trợ phát audio nền (background playback).
    - Tích hợp API **Text-to-Speech (TTS)** hỗ trợ đọc động các văn bản thuyết minh lịch sử theo giọng đọc tiếng Việt chuẩn (Bắc / Nam).

### 4. Trí tuệ nhân tạo (AI - Computer Vision)
- **Mô hình**: **YOLO (You Only Look Once - YOLOv8 / YOLOv11)** từ Ultralytics.
  - *Ứng dụng*: Xử lý bài toán thị giác máy tính nhận diện và định danh hiện vật di sản (Trống đồng Đông Sơn, Bình gốm Chu Đậu, Tượng Phật Bà Quan Âm, Bia Tiến sĩ Văn Miếu...) từ khung hình camera của du khách trong thời gian thực.
- **Microservice**: Đóng gói thành dịch vụ độc lập bằng **Python (FastAPI)** kết hợp **Uvicorn**, tối ưu hóa tính toán và có khả năng scale độc lập hoặc triển khai container qua **Docker**.

### 5. Kiến trúc Monorepo & Dữ liệu Dùng chung
- **NPM Workspaces**: Quản lý tập trung toàn bộ các gói trong một kho lưu trữ.
- **Module `@prj-van-hoa/shared`**: Chia sẻ dùng chung 100% các Interface, DTOs (Data Transfer Objects) và ApiResponse chuẩn giữa Backend và Mobile, loại bỏ hoàn toàn nguy cơ sai lệch cấu trúc dữ liệu.

---

## 📁 CẤU TRÚC CÂY THƯ MỤC DỰ ÁN ĐẦY ĐỦ (DETAILED DIRECTORY TREE)

```text
prj-van-hoa/
│
├── .gitignore                                   # Cấu hình loại trừ file rác, .env, serviceAccountKey, weights model
├── package.json                                 # Cấu hình Root Monorepo & các script khởi chạy workspace
├── README.md                                    # Tài liệu tổng quan kiến trúc, công nghệ và hướng dẫn sử dụng
├── generate_docs.js                             # Script tự động tạo tài liệu Microsoft Word (.docx)
│
├── shared/                                      # [MODULE DÙNG CHUNG] Types & DTOs cho Backend và Mobile
│   ├── package.json                             # Cấu hình npm package @prj-van-hoa/shared
│   ├── tsconfig.json                            # Cấu hình biên dịch TypeScript cho shared
│   ├── dist/                                    # Mã nguồn TypeScript sau khi build (.d.ts & .js)
│   └── src/
│       ├── artifact.ts                          # Interface dữ liệu Hiện vật văn hóa (CulturalArtifact)
│       ├── site.ts                              # Interface dữ liệu Địa điểm di tích & Tọa độ GPS (HeritageSite)
│       ├── ai.ts                                # Interface kết quả nhận diện YOLO (DetectionResult, BoundingBox)
│       ├── api.ts                               # Chuẩn hóa định dạng phản hồi API (ApiResponse, PaginatedResponse)
│       └── index.ts                             # Export tập trung toàn bộ kiểu dữ liệu
│
├── backend/                                     # [MODULE BACKEND] RESTful API (Node.js + Express + Firebase Admin)
│   ├── .env                                     # Biến môi trường cấu hình thực tế (PORT, Firebase, AI URL)
│   ├── .env.example                             # Mẫu biến môi trường cho nhà phát triển mới
│   ├── serviceAccountKey.json                   # Khóa bảo mật riêng của Firebase Admin SDK (đã kết nối dự án)
│   ├── serviceAccountKey.example.json           # File mẫu cấu trúc khóa chứng thực Firebase
│   ├── package.json                             # Khai báo dependencies (express, firebase-admin, multer, axios)
│   ├── tsconfig.json                            # Cấu hình TypeScript cho Backend
│   ├── dist/                                    # Kết quả biên dịch JavaScript để triển khai production
│   └── src/
│       ├── server.ts                            # Điểm khởi đầu (Entry Point) chạy Express Server
│       ├── app.ts                               # Khởi tạo Express app, cấu hình CORS, JSON parser và error handler
│       ├── config/                              # Cấu hình kết nối hệ thống
│       │   ├── env.ts                           # Nạp và kiểm tra biến môi trường từ .env
│       │   └── firebase.ts                      # Khởi tạo kết nối Firebase Admin SDK (db, storage, auth)
│       ├── controllers/                         # Tầng Điều khiển: Tiếp nhận HTTP Request và phản hồi Client
│       │   ├── artifact.controller.ts           # Controller quản lý Hiện vật (lấy danh sách, chi tiết, thêm mới)
│       │   ├── site.controller.ts               # Controller quản lý Di tích & Tọa độ bản đồ
│       │   ├── audio.controller.ts              # Controller xử lý yêu cầu phát/tạo giọng đọc TTS
│       │   └── ai.controller.ts                 # Controller tiếp nhận ảnh chụp camera và điều phối AI
│       ├── services/                            # Tầng Nghiệp vụ cốt lõi (Business Logic & Database Access)
│       │   ├── firestore.service.ts             # Thao tác CRUD trực tiếp với Cloud Firestore
│       │   ├── storage.service.ts               # Tải lên và lấy link ảnh/audio từ Firebase Storage
│       │   ├── tts.service.ts                   # Tích hợp dịch vụ chuyển đổi văn bản thành giọng nói (TTS)
│       │   └── aiProxy.service.ts               # Gửi ảnh sang AI Service và làm giàu dữ liệu từ Firestore
│       ├── routes/                              # Tầng Định tuyến API (/api/v1/...)
│       │   ├── artifact.routes.ts               # Route /api/v1/artifacts
│       │   ├── site.routes.ts                   # Route /api/v1/sites
│       │   ├── audio.routes.ts                  # Route /api/v1/audio
│       │   ├── ai.routes.ts                     # Route /api/v1/ai/detect
│       │   └── index.ts                         # Router tổng hợp và endpoint kiểm tra sức khỏe /health
│       ├── middlewares/                         # Các hàm tiền xử lý (Interceptors)
│       │   ├── auth.middleware.ts               # Xác thực người dùng bằng Firebase Auth ID Token
│       │   ├── upload.middleware.ts             # Xử lý file ảnh upload qua Multer MemoryStorage
│       │   └── error.middleware.ts              # Bắt lỗi tập trung (Global Exception Handler)
│       ├── scripts/                             # Scripts tiện ích hệ thống
│       │   └── seed.ts                          # Script tự động nạp dữ liệu mẫu hiện vật & di tích lên Firestore
│       └── utils/                               # Các hàm trợ giúp dùng chung
│           ├── apiResponse.ts                   # Chuẩn hóa cấu trúc trả về { success, data, message, timestamp }
│           └── logger.ts                        # Ghi log sự kiện hệ thống có gắn thời gian
│
├── mobile/                                      # [MODULE MOBILE APP] Ứng dụng di động (React Native + TypeScript)
│   ├── app.json                                 # Cấu hình tên hiển thị ứng dụng: "Di Sản Văn Hóa Việt"
│   ├── babel.config.js                          # Cấu hình Babel compiler và worklet plugin cho camera
│   ├── index.js                                 # Điểm khởi động đăng ký ứng dụng với React Native
│   ├── package.json                             # Thư viện phụ thuộc (Maps, Vision Camera, Sound, Navigation)
│   ├── tsconfig.json                            # Cấu hình TypeScript cho React Native
│   └── src/
│       ├── App.tsx                              # Component gốc bọc SafeAreaProvider và AppNavigator
│       ├── api/                                 # Tầng kết nối RESTful API Backend
│       │   ├── client.ts                        # Axios client tự động phân giải IP máy ảo Android / iOS
│       │   ├── artifactApi.ts                   # API truy vấn thông tin và danh mục hiện vật
│       │   ├── siteApi.ts                       # API lấy dữ liệu điểm di tích cho bản đồ
│       │   └── aiApi.ts                         # API upload ảnh camera lên Backend để nhận diện AI
│       ├── components/                          # Các thành phần giao diện tái sử dụng (Reusable UI)
│       │   ├── common/                          # Giao diện cơ bản
│       │   │   ├── Header.tsx                   # Thanh tiêu đề phong cách văn hóa truyền thống
│       │   │   └── CustomButton.tsx             # Nút bấm theo chuẩn thiết kế (vàng đồng / đỏ son)
│       │   ├── map/                             # Giao diện trên bản đồ
│       │   │   ├── CulturalMarker.tsx           # Marker biểu tượng di tích kiến trúc cổ
│       │   │   └── SiteCallout.tsx              # Thẻ xem trước thông tin di tích khi bấm vào marker
│       │   ├── camera/                          # Giao diện máy ảnh
│       │   │   └── CameraOverlay.tsx            # Khung ngắm quét điện tử & khung bao nhận diện hiện vật
│       │   └── audio/                           # Giao diện âm thanh
│       │       └── AudioMiniPlayer.tsx          # Thanh điều khiển nghe thuyết minh mini ghim đáy màn hình
│       ├── screens/                             # Các màn hình tính năng hoàn chỉnh
│       │   ├── Home/
│       │   │   └── HomeScreen.tsx               # Trang chủ: Banner quét AI, danh mục, bảo vật nổi bật
│       │   ├── Map/
│       │   │   └── CulturalMapScreen.tsx        # Bản đồ văn hóa tương tác (React Native Maps)
│       │   ├── Scanner/
│       │   │   └── ScannerScreen.tsx            # Màn hình quét hiện vật (Vision Camera + YOLO)
│       │   ├── ArtifactDetail/
│       │   │   └── ArtifactDetailScreen.tsx     # Chi tiết hiện vật: hoa văn, lịch sử và nút nghe Audio Guide
│       │   └── AudioTour/
│       │       └── AudioTourScreen.tsx          # Danh sách các bài thuyết minh tự động theo chủ đề
│       ├── navigation/                          # Hệ thống điều hướng màn hình
│       │   ├── types.ts                         # Định nghĩa kiểu tham số điều hướng (Navigation Params)
│       │   ├── BottomTabNavigator.tsx           # Thanh chuyển tab: Trang chủ - Bản đồ - Quét AI - Thuyết minh
│       │   └── AppNavigator.tsx                 # Stack Navigator tổng quản lý di chuyển màn hình
│       ├── hooks/                               # Custom React Hooks
│       │   ├── useAudioPlayer.ts                # Quản lý trạng thái phát/tạm dừng/chọn bài thuyết minh
│       │   ├── useCameraPermission.ts           # Kiểm tra và yêu cầu cấp quyền Camera
│       │   └── useLocation.ts                   # Lấy tọa độ GPS người dùng
│       ├── services/                            # Tích hợp dịch vụ thiết bị
│       │   └── audioService.ts                  # Wrapper điều khiển thư viện react-native-sound
│       └── utils/                               # Tiện ích bổ trợ
│           └── geoUtils.ts                      # Công thức Haversine tính cự ly GPS người dùng đến di tích
│
└── ai-service/                                  # [MODULE AI] Computer Vision Microservice (YOLO + FastAPI)
    ├── Dockerfile                               # Kịch bản đóng gói container chạy AI độc lập
    ├── requirements.txt                         # Thư viện Python: ultralytics, fastapi, uvicorn, pillow, numpy
    ├── README.md                                # Hướng dẫn train model YOLO và khởi chạy AI server
    └── app/
        ├── main.py                              # Khởi tạo ứng dụng FastAPI và cấu hình CORS
        ├── models/                              # Lưu trữ trọng số và bảng nhãn hiện vật
        │   ├── best.pt                          # Trọng số mô hình YOLO đã huấn luyện (PyTorch)
        │   └── labels.json                      # Bảng ánh xạ nhãn: Trống Đồng, Gốm Chu Đậu, Tượng Phật...
        ├── routes/
        │   └── predict.py                       # Endpoint POST /api/v1/predict tiếp nhận ảnh và suy luận AI
        └── services/
            └── detector.py                      # Pipeline nạp YOLO model kèm chế độ Mock test thông minh
```

---

## ⚡ HƯỚNG DẪN CÀI ĐẶT & KHỞI CHẠY HỆ THỐNG

### 1. Chuẩn bị môi trường
- Đảm bảo máy tính đã cài đặt: **Node.js** (>= 18.x), **Python** (>= 3.9), và **Git**.
- Cấu hình biến môi trường `PATH` để nhận diện các lệnh `node`, `npm`, `python`.

---

### 2. Khởi chạy Backend (`backend/`)
1. Di chuyển vào thư mục backend:
   ```powershell
   cd c:\Users\Admin\prj-van-hoa\backend
   npm install
   ```
2. Đặt file chứng thực `serviceAccountKey.json` tải từ Firebase Console vào thư mục `backend/` *(hiện đã được cấu hình sẵn trong dự án)*.
3. Chạy script nạp dữ liệu mẫu ban đầu lên Cloud Firestore (nếu cần):
   ```powershell
   npm run seed
   ```
4. Khởi động server ở chế độ phát triển:
   ```powershell
   npm run dev
   ```
   - Server hoạt động tại: `http://localhost:5000`
   - Kiểm tra trạng thái: `http://localhost:5000/api/v1/health`

---

### 3. Khởi chạy AI Microservice (`ai-service/`)
1. Mở cửa sổ terminal mới và di chuyển vào thư mục AI:
   ```powershell
   cd c:\Users\Admin\prj-van-hoa\ai-service
   ```
2. Tạo và kích hoạt môi trường ảo:
   ```powershell
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Cài đặt các thư viện trí tuệ nhân tạo:
   ```powershell
   pip install -r requirements.txt
   ```
4. Chạy dịch vụ FastAPI:
   ```powershell
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```
   - Tài liệu API tương tác (Swagger UI): `http://localhost:8000/docs`

---

### 4. Khởi chạy Ứng dụng Di động (`mobile/`)
1. Di chuyển vào thư mục mobile:
   ```powershell
   cd c:\Users\Admin\prj-van-hoa\mobile
   npm install
   ```
2. Khởi chạy Metro Bundler:
   ```powershell
   npm run start
   ```
3. Chạy ứng dụng trên thiết bị / máy ảo:
   - Trên **Android**:
     ```powershell
     npm run android
     ```
   - Trên **iOS** (yêu cầu máy Mac):
     ```bash
     cd ios && pod install && cd ..
     npm run ios
     ```

---

## 📡 DANH SÁCH RESTFUL API CHÍNH (`/api/v1`)

| Phương thức | Endpoint | Chức năng nghiệp vụ | Dữ liệu đầu vào / Ghi chú |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Kiểm tra trạng thái máy chủ | Không có |
| `GET` | `/artifacts` | Lấy danh sách hiện vật di sản văn hóa | Query params: `?category=...&limit=...` |
| `GET` | `/artifacts/:id` | Xem chi tiết hiện vật và liên kết audio | Tham số đường dẫn `:id` |
| `POST` | `/artifacts` | Thêm mới thông tin hiện vật | JSON Body: dữ liệu `CreateArtifactDTO` |
| `GET` | `/sites` | Lấy danh sách các điểm di tích văn hóa | Query params: `?limit=...` |
| `GET` | `/sites/:id` | Xem chi tiết điểm di tích kèm tọa độ GPS | Tham số đường dẫn `:id` |
| `POST` | `/ai/detect` | Nhận diện hiện vật từ ảnh chụp camera | Multipart form-data chứa file `file` |
| `POST` | `/audio/synthesize` | Chuyển văn bản thành giọng đọc thuyết minh (TTS) | JSON Body: `{ text: "...", voice: "..." }` |

---

## 🔄 SƠ ĐỒ LUỒNG TƯƠNG TÁC DỮ LIỆU TOÀN HỆ THỐNG

```text
  [Người dùng quét hiện vật]
              │
              ▼
  [mobile/src/screens/Scanner/ScannerScreen.tsx]
              │ (1. Chụp khung hình từ Vision Camera)
              ▼
  [mobile/src/api/aiApi.ts] ─────────────► [backend/src/controllers/ai.controller.ts]
                                                           │
                                                           ▼
                                             [backend/src/services/aiProxy.service.ts]
                                                           │ (2. Chuyển tiếp HTTP POST)
                                                           ▼
                                             [ai-service/app/routes/predict.py]
                                                           │ (3. Suy luận mô hình YOLO)
                                                           ▼
                                             [ai-service/app/services/detector.py]
                                                           │ (Nhận diện nhãn: "TRONG_DONG_NGOC_LU")
                                                           ▼
                                             [backend/src/services/firestore.service.ts]
                                                           │ (4. Truy vấn Cloud Firestore)
                                                           ▼
                                             [Làm giàu: Tên hiện vật, Niên đại, Link Audio]
                                                           │
                                                           ▼
  [mobile/src/screens/ArtifactDetail/ArtifactDetailScreen.tsx]
              │ (5. Hiển thị thông tin & Bấm nghe thuyết minh)
              ▼
  [mobile/src/hooks/useAudioPlayer.ts] ──► [mobile/src/services/audioService.ts]
              │ (6. Phát âm thanh nền & ghim AudioMiniPlayer.tsx)
              ▼
       (Du khách lắng nghe thuyết minh tự động mượt mà)
```

---

## 🎨 ĐẶC TRƯNG THIẾT KẾ & TÍNH NĂNG NỔI BẬT

1. **Bản sắc Văn hóa Tinh tế**: Giao diện được thiết kế độc quyền với bảng màu mang đậm nét di sản: màu đỏ son trầm của gạch cổ (`#8B1E1E`), vàng hoàng kim của ấn kiếm cung đình (`#C8963E`) và màu nền giấy dó cổ truyền (`#FAF7F2`).
2. **Khả năng Chống gián đoạn (Fault Tolerance)**: Hệ thống tích hợp sẵn cơ chế **Mock Fallback** thông minh cho cả YOLO AI và Firebase. Điều này cho phép đội ngũ phát triển giao diện Mobile có thể kiểm thử mượt mà toàn bộ quy trình ngay cả khi thiết bị chưa kết nối GPU hoặc server AI đang ngoại tuyến.
3. **Mở rộng Độc lập (Microservice Scalability)**: Module AI được tách biệt hoàn toàn; bạn có thể huấn luyện lại mô hình YOLO bất cứ lúc nào và cập nhật file `best.pt` mà không cần khởi động lại Backend hay biên dịch lại ứng dụng di động.
