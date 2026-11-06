const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  BorderStyle,
  WidthType,
  AlignmentType,
  ShadingType,
} = require('docx');

// Màu sắc chủ đạo của dự án
const COLOR_PRIMARY = '8B1E1E';   // Đỏ nâu di sản
const COLOR_SECONDARY = 'C8963E'; // Vàng hoàng kim
const COLOR_TEXT = '2A1B16';      // Nâu đen
const COLOR_MUTED = '666666';     // Xám
const COLOR_BG_LIGHT = 'F9F6F0';  // Nền giấy dó
const COLOR_TABLE_HEADER = '8B1E1E';

function createHeading1(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 150 },
  });
}

function createHeading2(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 100 },
  });
}

function createParagraph(text, isBold = false) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        bold: isBold,
        size: 24, // 12pt
        font: 'Segoe UI',
        color: COLOR_TEXT,
      }),
    ],
    spacing: { after: 120, line: 320 },
  });
}

function createBullet(text, boldPrefix = '') {
  return new Paragraph({
    bullet: { level: 0 },
    children: [
      boldPrefix ? new TextRun({ text: boldPrefix + ' ', bold: true, size: 24, font: 'Segoe UI', color: COLOR_PRIMARY }) : new TextRun(''),
      new TextRun({ text: text, size: 24, font: 'Segoe UI', color: COLOR_TEXT }),
    ],
    spacing: { after: 80, line: 300 },
  });
}

function createTableRow(cells, isHeader = false) {
  return new TableRow({
    children: cells.map((cellText, index) => {
      return new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: cellText,
                bold: isHeader,
                color: isHeader ? 'FFFFFF' : COLOR_TEXT,
                size: isHeader ? 22 : 20,
                font: 'Segoe UI',
              }),
            ],
            spacing: { before: 80, after: 80 },
          }),
        ],
        shading: {
          type: ShadingType.CLEAR,
          fill: isHeader ? COLOR_TABLE_HEADER : (index % 2 === 0 ? 'FFFFFF' : COLOR_BG_LIGHT),
        },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
      });
    }),
  });
}

async function generateDocx() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Segoe UI',
            size: 24,
            color: COLOR_TEXT,
          },
        },
      },
      heading1: {
        run: {
          font: 'Segoe UI',
          size: 36, // 18pt
          bold: true,
          color: COLOR_PRIMARY,
        },
      },
      heading2: {
        run: {
          font: 'Segoe UI',
          size: 28, // 14pt
          bold: true,
          color: COLOR_SECONDARY,
        },
      },
    },
    sections: [
      {
        properties: {},
        children: [
          // Tiêu đề tài liệu
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'DỰ ÁN NỀN TẢNG DI SẢN VĂN HÓA VIỆT NAM',
                bold: true,
                size: 44, // 22pt
                color: COLOR_PRIMARY,
                font: 'Segoe UI',
              }),
            ],
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'TÀI LIỆU GIẢI THÍCH Ý NGHĨA VÀ CHỨC NĂNG CÁC FILE MÃ NGUỒN (CODEBASE)',
                bold: true,
                size: 28, // 14pt
                color: COLOR_SECONDARY,
                font: 'Segoe UI',
              }),
            ],
            spacing: { after: 300 },
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Ngày lập: 27/10/2026 | Phiên bản kiến trúc: 1.0.0 | Hệ thống: Monorepo`,
                italics: true,
                size: 20,
                color: COLOR_MUTED,
              }),
            ],
            spacing: { after: 400 },
          }),

          // Phân cách
          new Paragraph({
            children: [new TextRun({ text: '_________________________________________________________________________________', color: COLOR_SECONDARY })],
            spacing: { after: 300 },
          }),

          // 1. TỔNG QUAN
          createHeading1('1. TỔNG QUAN HỆ THỐNG VÀ KIẾN TRÚC MONOREPO'),
          createParagraph('Dự án được xây dựng theo mô hình Monorepo hiện đại, tổ chức mã nguồn tập trung tại một kho lưu trữ duy nhất nhưng phân tách rõ ràng trách nhiệm giữa các tầng (Clean Architecture & Layered Architecture):'),
          createBullet('Module chứa các Interface, Types và DTOs dùng chung giữa Backend và Mobile App, đảm bảo tính nhất quán dữ liệu 100%.', '1. shared/:'),
          createBullet('Hệ thống RESTful API xây dựng bằng Node.js + TypeScript, Express.js và tích hợp trực tiếp cơ sở dữ liệu Cloud Firestore & Firebase Storage qua Firebase Admin SDK.', '2. backend/:'),
          createBullet('Ứng dụng di động đa nền tảng (Android & iOS) viết bằng React Native + TypeScript, tích hợp Bản đồ di tích (RN Maps), Quét camera (Vision Camera), và Thuyết minh tự động (Audio Guide / TTS).', '3. mobile/:'),
          createBullet('Microservice trí tuệ nhân tạo độc lập viết bằng Python + FastAPI, sử dụng mô hình Computer Vision (YOLO) để phát hiện và định danh hiện vật.', '4. ai-service/:'),

          // 2. MODULE SHARED
          createHeading1('2. MODULE DỮ LIỆU DÙNG CHUNG (shared/)'),
          createParagraph('Module này giúp chuẩn hóa kiểu dữ liệu, ngăn ngừa lỗi sai lệch tên trường (field mismatch) giữa Mobile và Server:'),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              createTableRow(['Đường dẫn file', 'Kiểu dữ liệu định nghĩa', 'Ý nghĩa & Mục đích sử dụng'], true),
              createTableRow(['shared/src/artifact.ts', 'CulturalArtifact, CreateArtifactDTO', 'Định nghĩa cấu trúc Hiện vật: mã code, tên, danh mục, thời kỳ lịch sử, hoa văn mô tả, ảnh, link audio.']),
              createTableRow(['shared/src/site.ts', 'HeritageSite, GeoCoordinates', 'Định nghĩa Địa điểm di tích: tên di tích, địa chỉ, tọa độ GPS (lat/long) cho bản đồ, giờ mở cửa, giá vé.']),
              createTableRow(['shared/src/ai.ts', 'BoundingBox, DetectionResult, AiInferenceResponse', 'Định nghĩa đầu ra từ mô hình YOLO: nhãn nhận diện, độ tin cậy (confidence), tọa độ hộp bao khung hiện vật.']),
              createTableRow(['shared/src/api.ts', 'ApiResponse<T>, PaginatedResponse<T>, ApiError', 'Chuẩn hóa định dạng phản hồi REST API đồng bộ cho toàn bộ hệ thống { success, message, data, timestamp }.']),
              createTableRow(['shared/src/index.ts', 'Exports', 'Tập hợp và export toàn bộ các định nghĩa để Backend và Mobile dễ dàng import.']),
              createTableRow(['shared/package.json', 'Config', 'Cấu hình npm package cục bộ @prj-van-hoa/shared.']),
              createTableRow(['shared/tsconfig.json', 'TypeScript Config', 'Cấu hình trình biên dịch TypeScript xuất file declaration .d.ts vào dist/.']),
            ],
          }),

          // 3. MODULE BACKEND
          createHeading1('3. MODULE BACKEND RESTFUL API (backend/)'),
          createParagraph('Backend chịu trách nhiệm bảo mật cơ sở dữ liệu Firebase, xử lý nghiệp vụ, điều phối yêu cầu người dùng và kết nối với AI Service:'),

          createHeading2('3.1. Cấu hình & Khởi tạo (Config)'),
          createBullet('Đọc và xác thực các biến môi trường từ file .env (cổng PORT, URL AI Service, Bucket Storage).', 'backend/src/config/env.ts:'),
          createBullet('Khởi tạo Firebase Admin SDK với Service Account. Kết nối an toàn đến Cloud Firestore, Firebase Storage và Firebase Authentication.', 'backend/src/config/firebase.ts:'),

          createHeading2('3.2. Tầng Dịch vụ (Services - Business Logic)'),
          createBullet('Thực hiện các thao tác CRUD lên Cloud Firestore (lấy danh sách hiện vật, lọc theo danh mục, truy vấn chi tiết, tìm kiếm theo mã định danh).', 'backend/src/services/firestore.service.ts:'),
          createBullet('Xử lý tải lên (upload) file ảnh hiện vật và file ghi âm thuyết minh lên Firebase Storage, cấp phát URL công khai/signed URL.', 'backend/src/services/storage.service.ts:'),
          createBullet('Tích hợp dịch vụ Text-To-Speech (TTS) để tổng hợp giọng đọc tiếng Việt chuẩn từ văn bản thuyết minh.', 'backend/src/services/tts.service.ts:'),
          createBullet('Gửi luồng ảnh chụp từ ứng dụng di động sang AI Service (FastAPI) để nhận diện qua YOLO, sau đó tự động tra cứu Firestore để làm giàu thông tin hiện vật.', 'backend/src/services/aiProxy.service.ts:'),

          createHeading2('3.3. Tầng Điều khiển (Controllers)'),
          createBullet('Xử lý request/response cho các endpoint quản lý hiện vật di sản (/api/v1/artifacts).', 'backend/src/controllers/artifact.controller.ts:'),
          createBullet('Tiếp nhận yêu cầu tìm kiếm và cung cấp tọa độ di tích cho bản đồ (/api/v1/sites).', 'backend/src/controllers/site.controller.ts:'),
          createBullet('Xử lý yêu cầu tạo file âm thanh thuyết minh tự động qua TTS (/api/v1/audio).', 'backend/src/controllers/audio.controller.ts:'),
          createBullet('Tiếp nhận file ảnh người dùng chụp từ camera và trả về kết quả nhận diện hiện vật (/api/v1/ai/detect).', 'backend/src/controllers/ai.controller.ts:'),

          createHeading2('3.4. Định tuyến & Middleware (Routes & Middlewares)'),
          createBullet('File router trung tâm tập hợp toàn bộ các nhánh API (/artifacts, /sites, /audio, /ai) và endpoint /health.', 'backend/src/routes/index.ts:'),
          createBullet('Xác thực token người dùng gửi lên qua header Authorization Bearer bằng Firebase Auth.', 'backend/src/middlewares/auth.middleware.ts:'),
          createBullet('Sử dụng Multer (MemoryStorage) để nhận file ảnh/audio trực tiếp vào RAM, tối ưu tốc độ xử lý.', 'backend/src/middlewares/upload.middleware.ts:'),
          createBullet('Bộ bắt lỗi tập trung (Global error handler), ngăn chặn lộ lỗi hệ thống nhạy cảm ra ngoài.', 'backend/src/middlewares/error.middleware.ts:'),

          createHeading2('3.5. Scripts Khởi tạo & Chạy Server'),
          createBullet('Cấu hình ứng dụng Express, kích hoạt CORS và parse JSON body.', 'backend/src/app.ts:'),
          createBullet('Điểm khởi đầu (Entry Point) kích hoạt server lắng nghe tại cổng đã định cấu hình.', 'backend/src/server.ts:'),
          createBullet('Script tự động nạp sẵn dữ liệu hiện vật tiêu biểu (Trống đồng Ngọc Lũ, Gốm Chu Đậu...) và di tích lên Firestore.', 'backend/src/scripts/seed.ts:'),
          createBullet('File chứa khóa bí mật của tài khoản quản trị Firebase (tải từ Firebase Console).', 'backend/serviceAccountKey.json:'),

          // 4. MODULE MOBILE
          createHeading1('4. MODULE MOBILE APP (mobile/)'),
          createParagraph('Ứng dụng di động được xây dựng bằng React Native + TypeScript theo hướng component hóa, mang giao diện tôn vinh nét đẹp văn hóa truyền thống:'),

          createHeading2('4.1. Tầng Kết nối API (API Clients)'),
          createBullet('Thiết lập Axios instance với cấu hình BaseURL thông minh tự nhận diện môi trường Android Emulator (10.0.2.2) hoặc iOS Simulator (localhost).', 'mobile/src/api/client.ts:'),
          createBullet('Các hàm gọi API lấy danh sách hiện vật, lọc theo nhóm, lấy chi tiết hiện vật.', 'mobile/src/api/artifactApi.ts:'),
          createBullet('Hàm gọi API lấy danh sách tọa độ các khu di tích văn hóa để hiển thị lên bản đồ.', 'mobile/src/api/siteApi.ts:'),
          createBullet('Đóng gói ảnh chụp thành multipart/form-data gửi lên Backend để nhận diện AI.', 'mobile/src/api/aiApi.ts:'),

          createHeading2('4.2. Giao diện Màn hình (Screens)'),
          createBullet('Màn hình chính hiển thị banner quét AI, danh mục di sản và danh sách bảo vật quốc gia nổi bật.', 'mobile/src/screens/Home/HomeScreen.tsx:'),
          createBullet('Bản đồ văn hóa tích hợp React Native Maps, hiển thị các Marker di tích kèm popup giới thiệu nhanh.', 'mobile/src/screens/Map/CulturalMapScreen.tsx:'),
          createBullet('Giao diện quét camera tích hợp Vision Camera, khung ngắm điện tử và nút bấm chụp ảnh gửi nhận diện AI.', 'mobile/src/screens/Scanner/ScannerScreen.tsx:'),
          createBullet('Trang thông tin chi tiết hiện vật: ảnh độ phân giải cao, niên đại, bài thuyết minh lịch sử và nút nghe Audio Guide.', 'mobile/src/screens/ArtifactDetail/ArtifactDetailScreen.tsx:'),
          createBullet('Danh sách các bài thuyết minh tự động theo từng chủ đề văn hóa để người dùng nghe tự do.', 'mobile/src/screens/AudioTour/AudioTourScreen.tsx:'),

          createHeading2('4.3. Thành phần Giao diện Dùng chung (Components)'),
          createBullet('Thanh tiêu đề mang bản sắc văn hóa với tông đỏ son và họa tiết hoàng kim.', 'mobile/src/components/common/Header.tsx:'),
          createBullet('Nút bấm chuẩn hóa với nhiều biến thể (chính, phụ, viền mỏng).', 'mobile/src/components/common/CustomButton.tsx:'),
          createBullet('Marker biểu tượng di tích kiến trúc được thiết kế riêng cho React Native Maps.', 'mobile/src/components/map/CulturalMarker.tsx:'),
          createBullet('Thẻ xem nhanh thông tin di tích khi người dùng chạm vào marker trên bản đồ.', 'mobile/src/components/map/SiteCallout.tsx:'),
          createBullet('Khung ngắm quét camera kèm nhãn hiển thị độ tin cậy kết quả nhận diện AI.', 'mobile/src/components/camera/CameraOverlay.tsx:'),
          createBullet('Thanh phát âm thanh mini thu nhỏ ghim ở đáy màn hình, giúp nghe thuyết minh liên tục.', 'mobile/src/components/audio/AudioMiniPlayer.tsx:'),

          createHeading2('4.4. Hooks, Dịch vụ & Điều hướng (Hooks & Navigation)'),
          createBullet('Custom Hook quản lý trạng thái phát, dừng, đổi bài thuyết minh âm thanh.', 'mobile/src/hooks/useAudioPlayer.ts:'),
          createBullet('Custom Hook kiểm tra và xin quyền truy cập Camera người dùng.', 'mobile/src/hooks/useCameraPermission.ts:'),
          createBullet('Custom Hook xác định tọa độ GPS của người dùng.', 'mobile/src/hooks/useLocation.ts:'),
          createBullet('Dịch vụ điều khiển âm thanh thiết bị thông qua thư viện react-native-sound.', 'mobile/src/services/audioService.ts:'),
          createBullet('Hàm toán học Haversine tính toán khoảng cách đường chim bay từ vị trí người dùng đến di tích.', 'mobile/src/utils/geoUtils.ts:'),
          createBullet('Thanh điều hướng chuyển đổi 4 tab: Trang chủ - Bản đồ - Quét AI - Thuyết minh.', 'mobile/src/navigation/BottomTabNavigator.tsx:'),
          createBullet('Bộ điều hướng Stack tổng quản lý luồng chuyển đổi giữa màn hình chính và chi tiết.', 'mobile/src/navigation/AppNavigator.tsx:'),
          createBullet('Component gốc của ứng dụng di động bọc trong SafeAreaProvider.', 'mobile/src/App.tsx:'),

          // 5. MODULE AI SERVICE
          createHeading1('5. MODULE TRÍ TUỆ NHÂN TẠO (ai-service/)'),
          createParagraph('Phần mềm phục vụ bài toán thị giác máy tính (Computer Vision) nhận diện hiện vật qua ảnh chụp:'),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              createTableRow(['Đường dẫn file', 'Công nghệ', 'Chức năng & Cơ chế hoạt động'], true),
              createTableRow(['ai-service/app/main.py', 'FastAPI', 'Khởi tạo API web server siêu nhẹ, kích hoạt CORS cho phép Backend kết nối.']),
              createTableRow(['ai-service/app/routes/predict.py', 'FastAPI Router', 'Endpoint POST /api/v1/predict tiếp nhận ảnh, đo thời gian suy luận (inferenceTime) và trả về danh sách hiện vật phát hiện.']),
              createTableRow(['ai-service/app/services/detector.py', 'Ultralytics YOLO & PIL', 'Nạp mô hình YOLO (best.pt). Tích hợp cơ chế Mock thông minh để hệ thống vẫn hoạt động trơn tru khi chạy trên máy chưa có GPU hoặc chưa nạp weights.']),
              createTableRow(['ai-service/app/models/labels.json', 'JSON Mapping', 'Bảng ánh xạ mã lớp sang tên tiếng Việt: Trống đồng Ngọc Lũ, Bình gốm Chu Đậu, Tượng Phật Bà Quan Âm, Bia tiến sĩ...']),
              createTableRow(['ai-service/Dockerfile', 'Docker', 'Kịch bản đóng gói container chạy AI trên môi trường cloud/server một cách nhất quán.']),
              createTableRow(['ai-service/requirements.txt', 'Python PIP', 'Danh sách thư viện cần thiết: fastapi, uvicorn, ultralytics, pillow, numpy.']),
            ],
          }),

          // 6. TÓM TẮT QUY TRÌNH HOẠT ĐỘNG
          createHeading1('6. QUY TRÌNH TƯƠNG TÁC TỔNG THỂ GIỮA CÁC FILE'),
          createParagraph('Khi một du khách sử dụng ứng dụng để trải nghiệm bảo tàng hoặc di tích:'),
          createBullet('ScannerScreen.tsx mở camera qua CameraOverlay.tsx -> Người dùng bấm chụp ảnh -> Gọi aiApi.ts.', '1. Quét hiện vật:'),
          createBullet('aiProxy.service.ts nhận ảnh qua Multer -> Đẩy sang predict.py trong ai-service -> detector.py chạy YOLO -> Trả về mã nhãn (code).', '2. Nhận diện AI:'),
          createBullet('firestore.service.ts tìm kiếm trong Firestore theo mã nhãn -> Trả về tên, hình ảnh và URL file audio thuyết minh từ Firebase Storage.', '3. Làm giàu dữ liệu:'),
          createBullet('ArtifactDetailScreen.tsx hiển thị thông tin -> Người dùng nhấn nghe -> useAudioPlayer.ts kích hoạt audioService.ts phát âm thanh kèm thanh điều khiển AudioMiniPlayer.tsx.', '4. Thuyết minh tự động:'),
          createBullet('CulturalMapScreen.tsx gọi siteApi.ts -> Hiển thị các CulturalMarker.tsx và tính cự ly qua geoUtils.ts.', '5. Định vị & Bản đồ:'),

          new Paragraph({
            spacing: { before: 400 },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: '--- HẾT TÀI LIỆU ---',
                bold: true,
                color: COLOR_MUTED,
                size: 20,
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.resolve(__dirname, 'Tai_Lieu_Giai_Thich_Ma_Nguon.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Đã tạo thành công file Word tại: ${outputPath}`);
}

generateDocx().catch(err => {
  console.error('Lỗi khi tạo file Word:', err);
});
