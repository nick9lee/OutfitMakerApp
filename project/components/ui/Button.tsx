import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  View,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native';
import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) => {
  
  const buttonStyles = [
    styles.button,
    styles[`${variant}Button`],
    styles[`${size}Button`],
    disabled && styles.disabledButton,
    style,
  ];
  
  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];
  
  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? COLORS.green : COLORS.white} />
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === 'left' && <View style={styles.iconLeft}>{icon}</View>}
          <Text style={textStyles}>{title}</Text>
          {icon && iconPosition === 'right' && <View style={styles.iconRight}>{icon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...TYPOGRAPHY.button,
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: SPACING.xsmall,
  },
  iconRight: {
    marginLeft: SPACING.xsmall,
  },
  // Variants
  primaryButton: {
    backgroundColor: COLORS.green,
  },
  primaryText: {
    color: COLORS.white,
  },
  secondaryButton: {
    backgroundColor: COLORS.beige,
  },
  secondaryText: {
    color: COLORS.black,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.green,
  },
  outlineText: {
    color: COLORS.green,
  },
  // Sizes
  smallButton: {
    paddingVertical: SPACING.xsmall,
    paddingHorizontal: SPACING.small,
  },
  smallText: {
    fontSize: 14,
  },
  mediumButton: {
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
  },
  mediumText: {
    fontSize: 16,
  },
  largeButton: {
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
  },
  largeText: {
    fontSize: 18,
  },
  // Disabled state
  disabledButton: {
    backgroundColor: COLORS.mediumGray,
    borderColor: COLORS.mediumGray,
    opacity: 0.5,
  },
  disabledText: {
    color: COLORS.darkGray,
  },
});

export default Button;