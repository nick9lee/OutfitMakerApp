import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';
import Button from '@/components/ui/Button';
import { Image as ImageIcon, Shirt as Tshirt, Camera, RefreshCw, Download, Share2 } from 'lucide-react-native';
import ImageUploadCard from '@/components/try-on/ImageUploadCard';
import ProgressBar from '@/components/ui/ProgressBar';
import { uploadImagesAndGenerateOutfit } from '../../controllers/imageGeneration';

export default function TryOnScreen() {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [clothingPhoto, setClothingPhoto] = useState<string | null>(null);
  const [resultPhoto, setResultPhoto] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please enable photo library access in your device settings to use this feature.',
          [
            { 
              text: 'Open Settings',
              onPress: () => ImagePicker.openSettings()
            },
            {
              text: 'Cancel',
              style: 'cancel'
            }
          ]
        );
      }
    })();
  }, []);

  const pickImage = async (type: 'user' | 'clothing') => {
    try {
      const options: ImagePicker.ImagePickerOptions = {
        mediaTypes: ImagePicker.MediaTypeOptions.images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
        presentationStyle: Platform.OS === 'ios' ? 'pageSheet' : undefined,
        base64: false,
      };

      const result = await ImagePicker.launchImageLibraryAsync(options);

      if (!result.canceled && result.assets[0]) {
        // On iOS, we need to handle the asset URI differently
        const uri = Platform.OS === 'ios' 
          ? result.assets[0].uri.replace('file://', '') 
          : result.assets[0].uri;

        if (type === 'user') {
          setUserPhoto(uri);
        } else {
          setClothingPhoto(uri);
        }
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'There was an error selecting the image. Please try again.',
        [{ text: 'OK' }]
      );
      console.error('Image picker error:', error);
    }
  };

  const generateOutfit = async() => {
    if (!userPhoto || !clothingPhoto) {
      Alert.alert(
        'Missing Images',
        'Please upload both your photo and a clothing item before generating.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    setIsGenerating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 0.05;
        
        if (newProgress >= 1) {
          clearInterval(interval);
          setTimeout(() => {
          }, 180000);
          return 1;
        }
        
        return newProgress;
      });
    }, 6000);

    const resultUrl = await uploadImagesAndGenerateOutfit(userPhoto, clothingPhoto);
    setResultPhoto(resultUrl);

    setProgress(100);
    setIsGenerating(false);
    
  };

  const resetAll = () => {
    setUserPhoto(null);
    setClothingPhoto(null);
    setResultPhoto(null);
    setIsGenerating(false);
    setProgress(0);
  };

  const shareOutfit = async () => {
    Alert.alert(
      'Coming Soon',
      'Sharing functionality will be available in the next update!',
      [{ text: 'OK' }]
    );
  };

  const saveOutfit = async () => {
    Alert.alert(
      'Success',
      'Outfit saved to your wardrobe!',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Try On</Text>
        <Text style={styles.subtitle}>See yourself in new outfits</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {!resultPhoto ? (
          <>
            <View style={styles.uploadContainer}>
              <ImageUploadCard
                title="Your Photo"
                description="Upload a full-body photo of yourself"
                imageUri={userPhoto}
                onPress={() => pickImage('user')}
                icon={<ImageIcon size={32} color={COLORS.green} />}
              />
              
              <ImageUploadCard
                title="Clothing Item"
                description="Upload a clothing item to try on"
                imageUri={clothingPhoto}
                onPress={() => pickImage('clothing')}
                icon={<Tshirt size={32} color={COLORS.green} />}
              />
            </View>

            {isGenerating ? (
              <View style={styles.generatingContainer}>
                <Text style={styles.generatingText}>Generating your outfit...</Text>
                <ProgressBar progress={progress} />
                <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
              </View>
            ) : (
              <Button 
                title="Generate Outfit" 
                onPress={generateOutfit}
                disabled={!userPhoto || !clothingPhoto}
                style={styles.generateButton}
              />
            )}
          </>
        ) : (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Your New Look</Text>
            <Image 
              source={{ uri: resultPhoto }} 
              style={styles.resultImage} 
              resizeMode="cover"
            />
            
            <View style={styles.actionButtonsContainer}>
              <Button 
                title="Save" 
                onPress={saveOutfit} 
                icon={<Download size={20} color={COLORS.white} />}
                style={styles.actionButton}
              />
              <Button 
                title="Share" 
                onPress={shareOutfit} 
                icon={<Share2 size={20} color={COLORS.white} />}
                style={styles.actionButton}
              />
              <Button 
                title="Try Another" 
                onPress={resetAll} 
                icon={<RefreshCw size={20} color={COLORS.white} />}
                style={styles.actionButton}
              />
            </View>
          </View>
        )}
        
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Tips for Best Results</Text>
          <View style={styles.tipItem}>
            <View style={styles.tipNumber}>
              <Text style={styles.tipNumberText}>1</Text>
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipItemTitle}>Use a neutral background</Text>
              <Text style={styles.tipDescription}>
                Stand against a plain wall for best results
              </Text>
            </View>
          </View>
          
          <View style={styles.tipItem}>
            <View style={styles.tipNumber}>
              <Text style={styles.tipNumberText}>2</Text>
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipItemTitle}>Good lighting is important</Text>
              <Text style={styles.tipDescription}>
                Take photos in well-lit areas for better quality
              </Text>
            </View>
          </View>
          
          <View style={styles.tipItem}>
            <View style={styles.tipNumber}>
              <Text style={styles.tipNumberText}>3</Text>
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipItemTitle}>Stand naturally</Text>
              <Text style={styles.tipDescription}>
                Natural poses work best for realistic outfit generation
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: SPACING.medium,
    paddingBottom: SPACING.medium,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.black,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.black,
    opacity: 0.7,
  },
  content: {
    paddingHorizontal: SPACING.medium,
    paddingBottom: SPACING.xxlarge,
  },
  uploadContainer: {
    flexDirection: 'column',
    gap: SPACING.medium,
    marginBottom: SPACING.large,
  },
  generateButton: {
    marginTop: SPACING.medium,
  },
  generatingContainer: {
    alignItems: 'center',
    marginTop: SPACING.large,
    marginBottom: SPACING.large,
  },
  generatingText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.black,
    marginBottom: SPACING.medium,
  },
  progressText: {
    ...TYPOGRAPHY.body,
    color: COLORS.green,
    marginTop: SPACING.small,
  },
  resultContainer: {
    marginBottom: SPACING.large,
  },
  resultTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.black,
    marginBottom: SPACING.medium,
    textAlign: 'center',
  },
  resultImage: {
    width: '100%',
    height: 500,
    borderRadius: 16,
    marginBottom: SPACING.medium,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.small,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: SPACING.xsmall,
  },
  tipsContainer: {
    backgroundColor: COLORS.beige,
    borderRadius: 16,
    padding: SPACING.medium,
    marginTop: SPACING.large,
  },
  tipsTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.black,
    marginBottom: SPACING.medium,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: SPACING.medium,
    alignItems: 'flex-start',
  },
  tipNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.small,
  },
  tipNumberText: {
    ...TYPOGRAPHY.body,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.white,
  },
  tipContent: {
    flex: 1,
  },
  tipItemTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.black,
    marginBottom: 4,
  },
  tipDescription: {
    ...TYPOGRAPHY.small,
    color: COLORS.black,
    opacity: 0.7,
  },
});