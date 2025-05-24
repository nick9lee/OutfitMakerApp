import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { Chrome as Home, Shirt as Tshirt, Album, User } from 'lucide-react-native';

import { COLORS } from '@/constants/Colors';
import TabBarLabel from '@/components/ui/TabBarLabel';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: COLORS.black,
        tabBarStyle: styles.tabBar,
        tabBarLabelPosition: 'below-icon',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          tabBarLabel: ({ focused, color }) => (
            <TabBarLabel title="Home" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="try-on"
        options={{
          title: 'Try On',
          tabBarIcon: ({ color, size }) => <Tshirt color={color} size={size} />,
          tabBarLabel: ({ focused, color }) => (
            <TabBarLabel title="Try On" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wardrobe"
        options={{
          title: 'Wardrobe',
          tabBarIcon: ({ color, size }) => <Album color={color} size={size} />,
          tabBarLabel: ({ focused, color }) => (
            <TabBarLabel title="Wardrobe" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          tabBarLabel: ({ focused, color }) => (
            <TabBarLabel title="Profile" focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    height: Platform.OS === 'ios' ? 88 : 64,
    paddingTop: 8,
    elevation: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
});