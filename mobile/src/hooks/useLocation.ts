import { useState, useEffect } from 'react';
import { GeoCoordinates } from '@prj-van-hoa/shared';

// Tọa độ mặc định: Trung tâm Hà Nội (Khu vực Quảng trường Ba Đình / Hoàng thành Thăng Long)
const DEFAULT_COORDS: GeoCoordinates = {
  latitude: 21.0338,
  longitude: 105.8431,
};

export const useLocation = () => {
  const [coordinates, setCoordinates] = useState<GeoCoordinates>(DEFAULT_COORDS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Có thể tích hợp @react-native-community/geolocation
    setCoordinates(DEFAULT_COORDS);
  }, []);

  return { coordinates, loading };
};
