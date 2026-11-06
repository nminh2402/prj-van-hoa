import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Header } from '../../components/common/Header';
import { CulturalMarker } from '../../components/map/CulturalMarker';
import { SiteCallout } from '../../components/map/SiteCallout';
import { siteApi } from '../../api/siteApi';
import { HeritageSite } from '@prj-van-hoa/shared';

export const CulturalMapScreen = ({ navigation }: any) => {
  const [sites, setSites] = useState<HeritageSite[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);

  // Vị trí mặc định: Thủ đô Hà Nội
  const initialRegion = {
    latitude: 21.0338,
    longitude: 105.8431,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
  };

  useEffect(() => {
    loadHeritageSites();
  }, []);

  const loadHeritageSites = async () => {
    setLoading(true);
    try {
      const res = await siteApi.getAll();
      if (res?.data?.length) {
        setSites(res.data);
      } else {
        // Mock dữ liệu di tích Hà Nội tiêu biểu
        setSites([
          {
            id: 'site-01',
            name: 'Bảo tàng Lịch sử Quốc gia',
            address: 'Số 1 Tràng Tiền, Hoàn Kiếm, Hà Nội',
            coordinates: { latitude: 21.0252, longitude: 105.8585 },
            description: 'Nơi lưu giữ các bảo vật quốc gia tiêu biểu từ thời tiền sử đến thế kỷ XX.',
            coverImage: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80',
            openingHours: '08:00 - 17:00 (Thứ 3 - Chủ nhật)',
          },
          {
            id: 'site-02',
            name: 'Hoàng thành Thăng Long',
            address: '19C Hoàng Diệu, Quán Thánh, Ba Đình, Hà Nội',
            coordinates: { latitude: 21.0348, longitude: 105.8402 },
            description: 'Di sản Văn hóa Thế giới UNESCO gắn liền với lịch sử kinh thành Thăng Long qua nhiều triều đại.',
            coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
            openingHours: '08:00 - 17:00',
          },
          {
            id: 'site-03',
            name: 'Văn Miếu - Quốc Tử Giám',
            address: '58 Quốc Tử Giám, Đống Đa, Hà Nội',
            coordinates: { latitude: 21.0285, longitude: 105.8355 },
            description: 'Trường đại học đầu tiên của Việt Nam với 82 Bia Tiến sĩ được vinh danh là Di sản tư liệu thế giới.',
            coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
            openingHours: '08:00 - 17:30',
          },
        ]);
      }
    } catch (e) {
      console.warn('Lỗi tải di tích bản đồ:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Bản Đồ Văn Hóa"
        subtitle="Khám phá di tích & bảo tàng lân cận"
      />

      <View style={styles.mapWrapper}>
        <MapView style={styles.map} initialRegion={initialRegion}>
          {sites.map(site => (
            <Marker
              key={site.id}
              coordinate={{
                latitude: site.coordinates.latitude,
                longitude: site.coordinates.longitude,
              }}
              onPress={() => setSelectedSiteId(site.id)}
            >
              <CulturalMarker
                title={site.name}
                isSelected={selectedSiteId === site.id}
              />
              <Callout
                tooltip
                onPress={() =>
                  navigation.navigate('ArtifactDetail', {
                    site,
                  })
                }
              >
                <SiteCallout
                  site={site}
                  onPress={() => setSelectedSiteId(site.id)}
                />
              </Callout>
            </Marker>
          ))}
        </MapView>

        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator color="#8B1E1E" />
            <Text style={styles.loadingText}>Đang tải điểm di tích...</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },
  mapWrapper: {
    flex: 1,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingBox: {
    position: 'absolute',
    top: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 4,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
});
