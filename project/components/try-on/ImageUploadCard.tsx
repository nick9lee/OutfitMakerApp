import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';

interface ImageUploadCardProps {
  title: string;
  description: string;
  imageUri: string | null;
  onPress: () => void;
  icon: React.ReactNode;
}

const ImageUploadCard = ({
  title,
  description,
  imageUri,
  onPress,
  icon,
}: ImageUploadCardProps) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {imageUri ? (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.overlay}>
            <Text style={styles.changeText}>Tap to change</Text>
          </View>
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          {icon}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 16,
    overflow: 'hidden',
    height: 180,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.medium,
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.black,
    marginTop: SPACING.small,
    marginBottom: SPACING.xxsmall,
    textAlign: 'center',
  },
  description: {
    ...TYPOGRAPHY.small,
    color: COLORS.black,
    opacity: 0.7,
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
  },
});

export default ImageUploadCard;