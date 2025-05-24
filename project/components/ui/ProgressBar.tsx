import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { COLORS } from '@/constants/Colors';

interface ProgressBarProps {
  progress: number; // 0 to 1
  color?: string;
  backgroundColor?: string;
  height?: number;
}

const { width } = Dimensions.get('window');

const ProgressBar = ({
  progress,
  color = COLORS.green,
  backgroundColor = COLORS.lightGray,
  height = 8,
}: ProgressBarProps) => {
  const progressWidth = width - 48; // Account for padding
  
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(progress * progressWidth, { duration: 300 }),
    };
  });

  return (
    <View style={[styles.container, { backgroundColor, height, width: progressWidth }]}>
      <Animated.View style={[styles.progress, { backgroundColor: color }, progressStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
});

export default ProgressBar;