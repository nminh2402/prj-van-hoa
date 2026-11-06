import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { HeritageSite } from '@prj-van-hoa/shared';

interface SiteCalloutProps {
  site: HeritageSite;
  onPress: () => void;
}

export const SiteCallout: React.FC<SiteCalloutProps> = ({ site, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={onPress}>
      {site.coverImage ? (
        <Image source={{ uri: site.coverImage }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text style={styles.placeholderIcon}>🏛️</Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{site.name}</Text>
        <Text style={styles.address} numberOfLines={1}>📍 {site.address}</Text>
        <Text style={styles.hours} numberOfLines={1}>🕒 {site.openingHours || '08:00 - 17:00'}</Text>
        <Text style={styles.actionText}>Xem chi tiết & di tích →</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 250,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#E8DCC4',
  },
  image: {
    width: '100%',
    height: 110,
    backgroundColor: '#EBE3D5',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 40,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#33261D',
  },
  address: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
  },
  hours: {
    fontSize: 11,
    color: '#8B1E1E',
    marginTop: 2,
    fontWeight: '500',
  },
  actionText: {
    fontSize: 11,
    color: '#C8963E',
    marginTop: 6,
    fontWeight: '600',
  },
});
