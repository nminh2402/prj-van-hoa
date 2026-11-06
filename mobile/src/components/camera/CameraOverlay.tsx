import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { DetectionResult } from '@prj-van-hoa/shared';

const { width } = Dimensions.get('window');
const SCAN_FRAME_SIZE = width * 0.75;

interface CameraOverlayProps {
  detections?: DetectionResult[];
  isScanning?: boolean;
}

export const CameraOverlay: React.FC<CameraOverlayProps> = ({ detections = [], isScanning }) => {
  return (
    <View style={styles.container} pointerEvents="none">
      {/* Khung ngắm quét camera */}
      <View style={styles.scanBox}>
        {/* 4 góc của khung ngắm */}
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />

        {/* Kết quả nhận diện hiện vật nếu có */}
        {detections.length > 0 && (
          <View style={styles.detectionBadge}>
            <Text style={styles.badgeLabel}>
              ✨ {detections[0].displayName}
            </Text>
            <Text style={styles.badgeConfidence}>
              Độ chính xác: {(detections[0].confidence * 100).toFixed(0)}%
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.instructionText}>
        {isScanning ? 'Đang phân tích hình ảnh AI...' : 'Hướng camera về phía hiện vật để nhận diện'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanBox: {
    width: SCAN_FRAME_SIZE,
    height: SCAN_FRAME_SIZE,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 16,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: '#C8963E', // Vàng hoàng kim
  },
  topLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 16,
  },
  topRight: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 16,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 16,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 16,
  },
  instructionText: {
    marginTop: 28,
    color: '#FFF8E7',
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    overflow: 'hidden',
    fontWeight: '500',
  },
  detectionBadge: {
    backgroundColor: 'rgba(139, 30, 30, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C8963E',
  },
  badgeLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  badgeConfidence: {
    color: '#F4ECE1',
    fontSize: 11,
    marginTop: 2,
  },
});
