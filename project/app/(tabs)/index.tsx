import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';
import Button from '@/components/ui/Button';
import { ArrowRight, WandSparkles as Wand2 } from 'lucide-react-native';
import FeaturedOutfit from '@/components/home/FeaturedOutfit';
import { TYPOGRAPHY } from '@/constants/Typography';

export default function HomeScreen() {
  const router = useRouter();

  const handleTryOnPress = () => {
    router.push('/try-on');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>GLAMR</Text>
          <Text style={styles.subtitle}>Try-On Experience</Text>
        </View>

        <View style={styles.heroContainer}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1682354928541-a9414fad7cb3?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>See Yourself in New Styles</Text>
            <Text style={styles.heroSubtitle}>
              Try on clothes virtually
            </Text>
            <Button 
              onPress={handleTryOnPress} 
              title="Style Now" 
              icon={<Wand2 size={20} color={COLORS.white} />}
              style={styles.heroButton}
            />
          </View>
        </View>

        {/* <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Outfits</Text>
            <Pressable onPress={() => router.push('/wardrobe')}>
              <View style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View All</Text>
                <ArrowRight size={16} color={COLORS.green} />
              </View>
            </Pressable>
          </View> */}
          
          {/* <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredOutfitsContainer}
          >
            <FeaturedOutfit 
              imageUrl="https://images.pexels.com/photos/5325881/pexels-photo-5325881.jpeg" 
              title="Casual Summer" 
              items={3}
            />
            <FeaturedOutfit 
              imageUrl="https://images.pexels.com/photos/5384429/pexels-photo-5384429.jpeg" 
              title="Business Casual" 
              items={4}
            />
            <FeaturedOutfit 
              imageUrl="https://images.pexels.com/photos/5325886/pexels-photo-5325886.jpeg" 
              title="Active Wear" 
              items={2}
            />
          </ScrollView>
        </View> */}

        <View style={styles.howItWorksSection}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.stepContainer}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepTitle}>Upload Your Photo</Text>
              <Text style={styles.stepDescription}>
                Take a photo or upload one from your gallery
              </Text>
            </View>
            
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepTitle}>Select Clothing</Text>
              <Text style={styles.stepDescription}>
                Choose a clothing item you'd like to try on
              </Text>
            </View>
            
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepTitle}>See the Result</Text>
              <Text style={styles.stepDescription}>
                Our AI generates an image of you in the new outfit
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
  heroContainer: {
    height: 480,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: SPACING.large,
    paddingBottom: SPACING.xlarge,
  },
  heroTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
    marginBottom: SPACING.xsmall,
  },
  heroSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.white,
    marginBottom: SPACING.medium,
  },
  heroButton: {
    minWidth: 140,
  },
  featuredSection: {
    paddingVertical: SPACING.large,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.medium,
    marginBottom: SPACING.medium,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.black,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    ...TYPOGRAPHY.button,
    color: COLORS.green,
    marginRight: SPACING.xsmall,
  },
  featuredOutfitsContainer: {
    paddingHorizontal: SPACING.medium,
    paddingBottom: SPACING.small,
  },
  howItWorksSection: {
    padding: SPACING.medium,
    paddingBottom: SPACING.xlarge,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.medium,
  },
  step: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: SPACING.xsmall,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  stepNumberText: {
    ...TYPOGRAPHY.h4,
    color: COLORS.white,
  },
  stepTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SPACING.xsmall,
  },
  stepDescription: {
    ...TYPOGRAPHY.small,
    color: COLORS.black,
    opacity: 0.7,
    textAlign: 'center',
  },
});