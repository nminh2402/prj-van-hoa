import { db } from '../config/firebase';

const sampleArtifacts = [
  {
    name: 'Trống đồng Ngọc Lũ',
    code: 'TRONG_DONG_NGOC_LU',
    category: 'Đồ đồng Văn hóa Đông Sơn',
    epoch: 'Thế kỷ II - III TCN',
    originLocation: 'Hà Nam, Việt Nam',
    description: 'Bảo vật quốc gia đỉnh cao của nghệ thuật đúc đồng Đông Sơn. Mặt trống đúc nổi hình ngôi sao 14 cánh ở trung tâm tượng trưng cho mặt trời, bao quanh là các vành hoa văn hình chim Lạc bay, cảnh giã gạo, múa vũ trang và thuyền chiến tinh xảo.',
    images: ['https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80'],
    audioGuideUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    audioDurationSeconds: 180,
    tags: ['Bảo vật quốc gia', 'Đông Sơn', 'Đồ đồng'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    name: 'Bình Gốm Chu Đậu Hoa Lam',
    code: 'BINH_GOM_CHU_DAU',
    category: 'Gốm sứ cổ truyền',
    epoch: 'Thế kỷ XV (Thời Lê sơ)',
    originLocation: 'Nam Sách, Hải Dương, Việt Nam',
    description: 'Dòng gốm đạo danh tiếng bậc nhất Việt Nam với kỹ nghệ men tro trấu tự nhiên, họa tiết hoa lam chim thiên nga, hoa sen phóng khoáng đậm đà hồn Việt.',
    images: ['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80'],
    audioGuideUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    audioDurationSeconds: 150,
    tags: ['Gốm Chu Đậu', 'Hoa lam', 'Lê sơ'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    name: 'Tượng Phật Bà Quan Âm Nghìn Mắt Nghìn Tay',
    code: 'TUONG_PHAT_QUAN_AM_NGHIN_MAT',
    category: 'Điêu khắc gỗ cổ',
    epoch: 'Năm 1656 (Thời Hậu Lê)',
    originLocation: 'Chùa Bút Tháp, Bắc Ninh, Việt Nam',
    description: 'Tuyệt tác điêu khắc gỗ sơn son thếp vàng của nghệ nhân Trương Thọ Nam. Tượng cao 3.7m với 11 đầu, 42 tay lớn và 952 tay nhỏ tạo thành vầng hào quang rực rỡ mang triết lý từ bi cứu khổ.',
    images: ['https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'],
    audioGuideUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    audioDurationSeconds: 210,
    tags: ['Chùa Bút Tháp', 'Bảo vật quốc gia', 'Phật giáo'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const sampleSites = [
  {
    name: 'Bảo tàng Lịch sử Quốc gia',
    address: 'Số 1 Tràng Tiền, Hoàn Kiếm, Hà Nội',
    coordinates: { latitude: 21.0252, longitude: 105.8585 },
    description: 'Nơi lưu giữ, trưng bày và giới thiệu lịch sử Việt Nam từ thời tiền sử đến nay với hàng trăm nghìn hiện vật và nhiều bảo vật quốc gia độc bản.',
    coverImage: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80',
    openingHours: '08:00 - 17:00 (Thứ 3 - Chủ nhật)',
    ticketPrice: '40.000 VNĐ / vé',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    name: 'Hoàng thành Thăng Long',
    address: '19C Hoàng Diệu, Quán Thánh, Ba Đình, Hà Nội',
    coordinates: { latitude: 21.0348, longitude: 105.8402 },
    description: 'Quần thể di tích gắn với lịch sử kinh thành Thăng Long - Đông Kinh từ thời tiền Thăng Long qua thời Đinh - Tiền Lê, phát triển mạnh dưới thời Lý, Trần, Lê và thành Hà Nội dưới triều Nguyễn.',
    coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    openingHours: '08:00 - 17:00 (Hàng ngày)',
    ticketPrice: '30.000 VNĐ / vé',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    name: 'Văn Miếu - Quốc Tử Giám',
    address: '58 Quốc Tử Giám, Đống Đa, Hà Nội',
    coordinates: { latitude: 21.0285, longitude: 105.8355 },
    description: 'Trường đại học đầu tiên của Việt Nam, nơi tôn vinh đạo học với Khuê Văn Các và 82 tấm Bia Tiến sĩ được UNESCO công nhận là Di sản tư liệu thế giới.',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    openingHours: '08:00 - 17:30 (Hàng ngày)',
    ticketPrice: '30.000 VNĐ / vé',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

async function seedDatabase() {
  console.log('🌱 Bắt đầu khởi tạo dữ liệu mẫu lên Cloud Firestore...');

  // Seed Artifacts
  const artifactCol = db.collection('artifacts');
  for (const art of sampleArtifacts) {
    const existing = await artifactCol.where('code', '==', art.code).limit(1).get();
    if (existing.empty) {
      const docRef = await artifactCol.add(art);
      console.log(` ✅ Đã thêm Hiện vật: ${art.name} (ID: ${docRef.id})`);
    } else {
      console.log(` ℹ️ Hiện vật đã tồn tại: ${art.name}`);
    }
  }

  // Seed Sites
  const siteCol = db.collection('heritage_sites');
  for (const site of sampleSites) {
    const existing = await siteCol.where('name', '==', site.name).limit(1).get();
    if (existing.empty) {
      const docRef = await siteCol.add(site);
      console.log(` ✅ Đã thêm Điểm di tích: ${site.name} (ID: ${docRef.id})`);
    } else {
      console.log(` ℹ️ Điểm di tích đã tồn tại: ${site.name}`);
    }
  }

  console.log('🎉 Hoàn tất nạp dữ liệu mẫu vào Cloud Firestore!');
  process.exit(0);
}

seedDatabase().catch(err => {
  console.error('❌ Lỗi khi nạp dữ liệu:', err);
  process.exit(1);
});
