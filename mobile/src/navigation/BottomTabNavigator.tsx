import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './types';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { CulturalMapScreen } from '../screens/Map/CulturalMapScreen';
import { ScannerScreen } from '../screens/Scanner/ScannerScreen';
import { AudioTourScreen } from '../screens/AudioTour/AudioTourScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E8DCC4',
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#8B1E1E',
        tabBarInactiveTintColor: '#8E827A',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="MapTab"
        component={CulturalMapScreen}
        options={{
          tabBarLabel: 'Bản đồ',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🗺️</Text>,
        }}
      />
      <Tab.Screen
        name="ScannerTab"
        component={ScannerScreen}
        options={{
          tabBarLabel: 'Quét AI',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>📷</Text>,
        }}
      />
      <Tab.Screen
        name="AudioTourTab"
        component={AudioTourScreen}
        options={{
          tabBarLabel: 'Thuyết minh',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🎧</Text>,
        }}
      />
    </Tab.Navigator>
  );
};
