import { useState, useEffect } from 'react';
import { Camera } from 'react-native-vision-camera';

export const useCameraPermission = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const status = await Camera.getCameraPermissionStatus();
        if (status === 'granted') {
          setHasPermission(true);
        } else {
          const newStatus = await Camera.requestCameraPermission();
          setHasPermission(newStatus === 'granted');
        }
      } catch (error) {
        console.warn('Lỗi kiểm tra quyền camera:', error);
        setHasPermission(false);
      }
    })();
  }, []);

  return { hasPermission };
};
