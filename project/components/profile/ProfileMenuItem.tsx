import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';
import { ChevronRight } from 'lucide-react-native';

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
  showToggle?: boolean;
  isDestructive?: boolean;
}

const ProfileMenuItem = ({
  icon,
  title,
  onPress,
  showToggle = false,
  isDestructive = false,
}: ProfileMenuItemProps) => {
  const [isEnabled, setIsEnabled] = React.useState(true);
  
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      disabled={showToggle || !onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftContent}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <Text style={[
          styles.title, 
          isDestructive && styles.destructiveText
        ]}>
          {title}
        </Text>
      </View>
      
      {showToggle ? (
        <Switch
          trackColor={{ false: COLORS.lightGray, true: COLORS.greenTransparent }}
          thumbColor={isEnabled ? COLORS.green : COLORS.mediumGray}
          ios_backgroundColor={COLORS.lightGray}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      ) : onPress ? (
        <ChevronRight size={20} color={COLORS.mediumGray} />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: SPACING.small,
  },
  title: {
    ...TYPOGRAPHY.body,
    color: COLORS.black,
  },
  destructiveText: {
    color: COLORS.error,
  },
});

export default ProfileMenuItem;