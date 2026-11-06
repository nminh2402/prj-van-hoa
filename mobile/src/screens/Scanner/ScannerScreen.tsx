import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { Header } from '../../components/common/Header';
import { CameraOverlay } from '../../components/camera/CameraOverlay';
import { useCameraPermission } from '../../hooks/useCameraPermission';
import { aiApi } from '../../api/aiApi';
import { DetectionResult } from '@prj-van-hoa/shared';

export const ScannerScreen = ({ navigation }: any) => {
  const { hasPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const cameraRef = useRef<Camera>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [detections, setDetections] = useState<DetectionResult[]>([]);

  const handleCaptureAndDetect = async () => {
    if (!cameraRef.current) return;

    try {
      setIsScanning(true);
      const photo = await cameraRef.current.takePhoto({
        enableShutterSound: false,
      });

      // Gọi API AI xử lý nhận diện hiện vật
      const result = await aiApi.detectArtifact(`file://${photo.path}`);

      if (result.detections?.length > 0) {
        setDetections(result.detections);
        const topDetection = result.detections[0];

        // Hỏi người dùng muốn xem chi tiết hiện vật nhận diện được không
        Alert.alert(
          'Đã nhận diện hiện vật!',
          `Phát hiện: ${topDetection.displayName}\nĐộ tin cậy: ${(topDetection.confidence * 100).toFixed(0)}%`,
          [
            { text: 'Chụp lại', style: 'cancel' },
            {
              text: 'Xem chi tiết',
              onPress: () => {
                navigation.navigate('ArtifactDetail', {
                  artifactId: topDetection.artifactId,
                  detectedName: topDetection.displayName,
                });
              },
            },
          ]
        );
      } else {
        Alert.alert('Chưa nhận diện được', 'Không tìm thấy hiện vật phù hợp trong cơ sở dữ liệu. Hãy thử đổi góc chụp và đủ ánh sáng.');
      }
    } catch (error: any) {
      console.warn('Lỗi quét camera:', error);
      Alert.alert('Thông báo', 'Không thể kết nối đến máy chủ nhận diện AI. Đang hiển thị kết quả giả lập mẫu.');
      setDetections([
        {
          label: 'TRONG_DONG_DONG_SON',
          displayName: 'Trống Đồng Đông Sơn',
          confidence: 0.94,
          bbox: { x: 50, y: 100, width: 300, height: 300 },
        },
      ]);
    } finally {
      setIsScanning(false);
    }
  };

  if (hasPermission === false) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Ứng dụng cần quyền truy cập Camera để nhận diện hiện vật.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Quét Hiện Vật AI"
        subtitle="Mô hình Computer Vision (YOLO)"
      />

      <View style={styles.cameraBox}>
        {device ? (
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
        ) : (
          <View style={styles.noCameraView}>
            <Text style={styles.noCameraIcon}>📷</Text>
            <Text style={styles.noCameraText}>Không tìm thấy Camera (hoặc đang chạy máy ảo)</Text>
          </View>
        )}

        <CameraOverlay detections={detections} isScanning={isScanning} />

        {/* Nút chụp ảnh quét */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.captureButton, isScanning && styles.captureButtonDisabled]}
            onPress={handleCaptureAndDetect}
            disabled={isScanning}
          >
            {isScanning ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <View style={styles.innerCaptureCircle} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  cameraBox: {
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FAF7F2',
  },
  errorText: {
    color: '#8B1E1E',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  noCameraView: {
    flex: 1,
    backgroundColor: '#1E1B18',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCameraIcon: {
    fontSize: 50,
  },
  noCameraText: {
    color: '#E0C9A6',
    marginTop: 12,
    fontSize: 14,
  },
  actionRow: {
    alignItems: 'center',
    paddingBottom: 40,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingTop: 16,
  },
  captureButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: '#C8963E',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  captureButtonDisabled: {
    opacity: 0.6,
  },
  innerCaptureCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFF8E7',
  },
});
