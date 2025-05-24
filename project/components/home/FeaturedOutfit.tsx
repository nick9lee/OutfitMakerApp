import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';
import { Shirt as Tshirt } from 'lucide-react-native';

interface FeaturedOutfitProps {
  imageUrl: string;
  title: string;
  items: number;
  onPress?: () => void;
}

const FeaturedOutfit = ({
  imageUrl,
  title,
  items,
  onPress,
}: FeaturedOutfitProps) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <View style={styles.itemsContainer}>
          <Tshirt size={14} color={COLORS.black} />
          <Text style={styles.itemsText}>{items} items</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    marginRight: SPACING.medium,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 240,
  },
  infoContainer: {
    padding: SPACING.small,
  },
  title: {
    ...TYPOGRAPHY.h4,
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 4,
  },
  itemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemsText: {
    ...TYPOGRAPHY.small,
    color: COLORS.black,
    marginLeft: 4,
    opacity: 0.7,
  },
});

export default FeaturedOutfit;