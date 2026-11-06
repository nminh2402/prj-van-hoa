import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CulturalMarkerProps {
  title: string;
  isSelected?: boolean;
}

export const CulturalMarker: React.FC<CulturalMarkerProps> = ({ title, isSelected }) => {
  return (
    <View style={[styles.markerContainer, isSelected && styles.selectedContainer]}>
      <View style={[styles.pin, isSelected && styles.selectedPin]}>
        <Text style={styles.iconText}>🏛️</Text>
      </View>
      <View style={[styles.arrow, isSelected && styles.selectedArrow]} />
    </View>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedContainer: {
    transform: [{ scale: 1.15 }],
  },
  pin: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#8B1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF8E7',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  selectedPin: {
    backgroundColor: '#C8963E',
    borderColor: '#FFFFFF',
  },
  iconText: {
    fontSize: 18,
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 0,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#8B1E1E',
    marginTop: -1,
  },
  selectedArrow: {
    borderTopColor: '#C8963E',
  },
});
