import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface AudioMiniPlayerProps {
  title: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onClose?: () => void;
  onPressCard?: () => void;
}

export const AudioMiniPlayer: React.FC<AudioMiniPlayerProps> = ({
  title,
  isPlaying,
  onPlayPause,
  onClose,
  onPressCard,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
      onPress={onPressCard}
    >
      <View style={styles.left}>
        <View style={styles.disc}>
          <Text style={styles.discIcon}>🎧</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.label}>Thuyết minh tự động</Text>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.playButton} onPress={onPlayPause}>
          <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
        </TouchableOpacity>

        {onClose && (
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: '#2A1B16',
    borderTopWidth: 2,
    borderTopColor: '#C8963E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  disc: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#C8963E',
  },
  discIcon: {
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: '#C8963E',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  title: {
    fontSize: 13,
    color: '#FFF8E7',
    fontWeight: '600',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#C8963E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  playIcon: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  closeButton: {
    padding: 6,
  },
  closeIcon: {
    color: '#A09080',
    fontSize: 14,
  },
});
