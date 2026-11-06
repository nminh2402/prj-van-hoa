import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Header } from '../../components/common/Header';
import { AudioMiniPlayer } from '../../components/audio/AudioMiniPlayer';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

export const AudioTourScreen = () => {
  const { isPlaying, currentTrack, play, togglePlay, stop } = useAudioPlayer();

  const tours = [
    {
      id: 'tour-1',
      title: 'Hành trình Văn minh Sông Hồng & Văn hóa Đông Sơn',
      duration: '14 phút',
      narrator: 'Giọng đọc chuẩn Hà Nội',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      id: 'tour-2',
      title: 'Nghệ thuật Gốm Chu Đậu - Tinh hoa men tro truyền thống',
      duration: '09 phút',
      narrator: 'Giọng đọc chuẩn Bắc Bộ',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
      id: 'tour-3',
      title: 'Bảo vật Quốc gia tại Hoàng thành Thăng Long',
      duration: '22 phút',
      narrator: 'Giọng đọc truyền cảm',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        title="Thuyết Minh Tự Động"
        subtitle="Audio Guide đa dạng chủ đề văn hóa"
      />

      <FlatList
        data={tours}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isThisTrackPlaying = isPlaying && currentTrack?.title === item.title;
          return (
            <TouchableOpacity
              style={styles.tourCard}
              activeOpacity={0.8}
              onPress={() => {
                if (isThisTrackPlaying) {
                  togglePlay();
                } else {
                  play(item.title, item.audioUrl);
                }
              }}
            >
              <View style={styles.playIconContainer}>
                <Text style={styles.playSymbol}>
                  {isThisTrackPlaying ? '⏸' : '▶'}
                </Text>
              </View>
              <View style={styles.tourInfo}>
                <Text style={styles.tourTitle}>{item.title}</Text>
                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>⏱ {item.duration}</Text>
                  <Text style={styles.metaDot}>•</Text>
                  <Text style={styles.metaText}>🎙️ {item.narrator}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />

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
  list: {
    padding: 16,
  },
  tourCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EFE7DA',
    elevation: 2,
  },
  playIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8B1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  playSymbol: {
    color: '#FFF8E7',
    fontSize: 16,
    fontWeight: '700',
  },
  tourInfo: {
    flex: 1,
  },
  tourTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2A1B16',
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  metaText: {
    fontSize: 12,
    color: '#7C6E65',
  },
  metaDot: {
    marginHorizontal: 6,
    color: '#C8963E',
  },
});
