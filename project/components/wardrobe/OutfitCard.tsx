import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';
import { Shirt as Tshirt, Calendar } from 'lucide-react-native';

interface OutfitCardProps {
  name: string;
  imageUrl: string;
  date: string;
  items: number;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - SPACING.medium * 3) / 2; // 2 columns with spacing in between

const OutfitCard = ({
  name,
  imageUrl,
  date,
  items,
  onPress,
}: OutfitCardProps) => {
  // Format date to a readable format
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

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
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Calendar size={14} color={COLORS.black} />
            <Text style={styles.infoText}>{formattedDate}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Tshirt size={14} color={COLORS.black} />
            <Text style={styles.infoText}>{items}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    marginBottom: SPACING.medium,
    overflow: 'hidden',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: SPACING.small,
  },
  name: {
    ...TYPOGRAPHY.h4,
    fontSize: 16,
    color: COLORS.black,
    marginBottom: SPACING.xxsmall,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    ...TYPOGRAPHY.small,
    color: COLORS.black,
    opacity: 0.7,
    marginLeft: 4,
  },
});

export default OutfitCard;