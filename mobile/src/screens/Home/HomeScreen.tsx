import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Header } from '../../components/common/Header';
import { artifactApi } from '../../api/artifactApi';
import { CulturalArtifact } from '@prj-van-hoa/shared';

export const HomeScreen = ({ navigation }: any) => {
  const [artifacts, setArtifacts] = useState<CulturalArtifact[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFeaturedArtifacts();
  }, []);

  const loadFeaturedArtifacts = async () => {
    setLoading(true);
    try {
      const response = await artifactApi.getAll();
      if (response?.data?.length) {
        setArtifacts(response.data);
      } else {
        // Mock data nếu backend chưa có dữ liệu mẫu
        setArtifacts([
          {
            id: 'art-01',
            name: 'Trống đồng Ngọc Lũ',
            code: 'TRONG_DONG_NGOC_LU',
            category: 'Đồ đồng Đông Sơn',
            epoch: 'Thế kỷ II - III TCN',
            originLocation: 'Hà Nam, Việt Nam',
            description: 'Bảo vật quốc gia đỉnh cao của nghệ thuật đúc đồng Đông Sơn với hoa văn chim Lạc, thuyền chiến tinh xảo.',
            images: ['https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80'],
            audioGuideUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          },
          {
            id: 'art-02',
            name: 'Bình Gốm Chu Đậu Hoa Lam',
            code: 'BINH_GOM_CHU_DAU',
            category: 'Gốm sứ cổ truyền',
            epoch: 'Thế kỷ XV (Thời Lê sơ)',
            originLocation: 'Hải Dương, Việt Nam',
            description: 'Dòng gốm đạo danh tiếng bậc nhất Việt Nam với men tro trấu tự nhiên và nét vẽ phóng khoáng.',
            images: ['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80'],
          },
        ]);
      }
    } catch (e) {
      console.warn('Lỗi tải hiện vật:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Di Sản Văn Hóa Việt"
        subtitle="Khám phá kho tàng lịch sử & nghệ thuật"
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Banner Quét Hiện Vật AI */}
        <TouchableOpacity
          style={styles.aiBanner}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('ScannerTab')}
        >
          <View style={styles.aiTextContainer}>
            <Text style={styles.aiTag}>✨ CÔNG NGHỆ COMPUTER VISION</Text>
            <Text style={styles.aiTitle}>Nhận diện Hiện vật qua Camera</Text>
            <Text style={styles.aiDesc}>
              Chụp ảnh hiện vật để nhận thông tin chi tiết và lắng nghe thuyết minh tự động.
            </Text>
            <View style={styles.aiButton}>
              <Text style={styles.aiButtonText}>Mở Camera Quét ngay →</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Khám phá nhanh */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🏛️ Danh mục Di sản</Text>
        </View>
        <View style={styles.categoryRow}>
          {[
            { label: 'Đồ đồng', icon: '🔔' },
            { label: 'Gốm sứ', icon: '🏺' },
            { label: 'Điêu khắc', icon: '🗿' },
            { label: 'Bia đá', icon: '📜' },
          ].map((cat, idx) => (
            <TouchableOpacity key={idx} style={styles.catCard}>
              <Text style={styles.catIcon}>{cat.icon}</Text>
              <Text style={styles.catLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Hiện vật tiêu biểu */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>⭐ Bảo vật Quốc gia Tiêu biểu</Text>
        </View>

        {loading ? (
          <ActivityIndicator color="#8B1E1E" style={{ marginVertical: 20 }} />
        ) : (
          <FlatList
            data={artifacts}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.artifactList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.artifactCard}
                onPress={() => navigation.navigate('ArtifactDetail', { artifact: item })}
              >
                <Image source={{ uri: item.images[0] }} style={styles.artifactImage} />
                <View style={styles.artifactInfo}>
                  <Text style={styles.artifactEpoch}>{item.epoch}</Text>
                  <Text style={styles.artifactName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.artifactCategory}>{item.category}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  aiBanner: {
    margin: 16,
    backgroundColor: '#8B1E1E',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    borderWidth: 1.5,
    borderColor: '#C8963E',
  },
  aiTextContainer: {},
  aiTag: {
    color: '#E0C9A6',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  aiTitle: {
    color: '#FFF8E7',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 6,
  },
  aiDesc: {
    color: '#F4ECE1',
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
  },
  aiButton: {
    backgroundColor: '#C8963E',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 14,
  },
  aiButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#33261D',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  catCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFE7DA',
    elevation: 2,
  },
  catIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  catLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A3B32',
  },
  artifactList: {
    paddingHorizontal: 12,
  },
  artifactCard: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginHorizontal: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EFE7DA',
    elevation: 3,
  },
  artifactImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#EAE1D3',
  },
  artifactInfo: {
    padding: 10,
  },
  artifactEpoch: {
    fontSize: 10,
    color: '#8B1E1E',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  artifactName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2A1B16',
    marginTop: 2,
  },
  artifactCategory: {
    fontSize: 12,
    color: '#7C6E65',
    marginTop: 2,
  },
});
