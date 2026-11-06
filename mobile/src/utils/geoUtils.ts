import { GeoCoordinates } from '@prj-van-hoa/shared';

/**
 * Tính khoảng cách đường chim bay giữa 2 điểm tọa độ (công thức Haversine) - đơn vị km
 */
export const calculateDistanceKm = (pointA: GeoCoordinates, pointB: GeoCoordinates): number => {
  const R = 6371; // Bán kính Trái Đất (km)
  const dLat = deg2rad(pointB.latitude - pointA.latitude);
  const dLon = deg2rad(pointB.longitude - pointA.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(pointA.latitude)) *
      Math.cos(deg2rad(pointB.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Làm tròn 1 chữ số thập phân
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};
