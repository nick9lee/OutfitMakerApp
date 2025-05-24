import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TYPOGRAPHY } from '@/constants/Typography';
import { COLORS } from '@/constants/Colors';

interface TabBarLabelProps {
  title: string;
  focused: boolean;
  color: string;
}

const TabBarLabel = ({ title, focused, color }: TabBarLabelProps) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          { color },
          focused && styles.focused
        ]}
      >
        {title}
      </Text>
      {focused && <View style={styles.dot} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 2,
  },
  label: {
    ...TYPOGRAPHY.small,
    fontSize: 12,
  },
  focused: {
    fontFamily: 'Inter-Medium',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.green,
    marginTop: 4,
  },
});

export default TabBarLabel;