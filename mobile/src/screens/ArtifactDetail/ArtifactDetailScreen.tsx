import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Header } from '../../components/common/Header';
import { CustomButton } from '../../components/common/CustomButton';
import { AudioMiniPlayer } from '../../components/audio/AudioMiniPlayer';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { artifactApi } from '../../api/artifactApi';
import { CulturalArtifact } from '@prj-van-hoa/shared';

export const ArtifactDetailScreen = ({ route, navigation }: any) => {
  const { artifactId, artifact: initialArtifact } = route.params || {};
  const [artifact, setArtifact] = useState<CulturalArtifact | null>(initialArtifact || null);
  const [loading, setLoading] = useState(false);

  const { isPlaying, currentTrack, play, togglePlay, stop } = useAudioPlayer();

  useEffect(() => {
    if (!artifact && artifactId) {
      loadDetail(artifactId);
    }
  }, [artifactId]);

  const loadDetail = async (id: string) => {
    setLoading(true);
    try {
      const res = await artifactApi.getById(id);
      if (res?.data) {
        setArtifact(res.data);
      }
    } catch (e) {
      console.warn('Lỗi tải chi tiết:', e);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAudioGuide = () => {
    if (artifact?.audioGuideUrl) {
      play(artifact.name, artifact.audioGuideUrl);
    } else {
      // Audio demo mẫu
      play(
        artifact?.name || 'Thuyết minh hiện vật',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#8B1E1E" />
      </View>
    );
  }

  const current = artifact || {
    id: 'demo',
    name: 'Trống Đồng Đông Sơn',
    category: 'Đồ đồng Văn hóa Đông Sơn',
    epoch: 'Thế kỷ VII TCN - Thế kỷ I SCN',
    originLocation: 'Lưu vực sông Hồng, Việt Nam',
    description:
      'Trống đồng Đông Sơn là hiện vật tiêu biểu cho nền văn minh nông nghiệp lúa nước rực rỡ của người Việt cổ. Mặt trống đúc nổi hình ngôi sao nhiều cánh ở trung tâm tượng trưng cho mặt trời, bao quanh là các vành hoa văn hình chim Lạc bay, cảnh giã gạo, múa vũ trang và thuyền chiến.',
    images: ['https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80'],
  };

  return (
    <View style={styles.container}>
      <Header
        title="Thông Tin Hiện Vật"
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={{ uri: current.images[0] }} style={styles.coverImage} />

        <View style={styles.body}>
          <Text style={styles.epochBadge}>{current.epoch}</Text>
          <Text style={styles.title}>{current.name}</Text>
          <Text style={styles.category}>🏛️ {current.category}</Text>
          <Text style={styles.origin}>📍 Xuất xứ: {current.originLocation}</Text>

          {/* Nút Thuyết minh Audio Guide */}
          <View style={styles.audioSection}>
            <CustomButton
              title={isPlaying ? '⏸ Tạm dừng Thuyết minh' : '🎧 Nghe Thuyết minh Tự động'}
              variant="secondary"
              onPress={isPlaying ? togglePlay : handlePlayAudioGuide}
            />
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionHeading}>📖 Ý nghĩa Lịch sử & Hoa văn</Text>
          <Text style={styles.descText}>{current.description}</Text>
        </View>
      </ScrollView>

      {/* Mini Audio Player ghim phía dưới nếu đang phát */}
      {currentTrack && (
        <AudioMiniPlayer
          title={currentTrack.title}
          isPlaying={isPlaying}
          onPlayPause={togglePlay}
          onClose={stop}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    paddingBottom: 30,
  },
  coverImage: {
    width: '100%',
    height: 260,
    backgroundColor: '#EAE1D3',
  },
  body: {
    padding: 20,
    backgroundColor: '#FAF7F2',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
  },
  epochBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#8B1E1E',
    color: '#FFF8E7',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2A1B16',
    marginTop: 10,
  },
  category: {
    fontSize: 14,
    color: '#7C6E65',
    marginTop: 6,
    fontWeight: '600',
  },
  origin: {
    fontSize: 13,
    color: '#4A3B32',
    marginTop: 4,
  },
  audioSection: {
    marginTop: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8DCC4',
    marginVertical: 18,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2A1B16',
    marginBottom: 8,
  },
  descText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4A3B32',
  },
});
