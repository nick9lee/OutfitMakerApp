import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';
import { TYPOGRAPHY } from '@/constants/Typography';
import { ChevronRight, Camera, Settings, Bell, Lock, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import ProfileMenuItem from '@/components/profile/ProfileMenuItem';

export default function ProfileScreen() {
  const user = {
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    outfitCount: 12,
    memberSince: 'May 2025',
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Your account settings</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.profileCard}>
          <Image
            source={{ uri: user.photo }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
          <TouchableOpacity style={styles.changePhotoButton}>
            <Camera size={18} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.outfitCount}</Text>
            <Text style={styles.statLabel}>Outfits</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.memberSince}</Text>
            <Text style={styles.statLabel}>Member Since</Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <View style={styles.settingsContainer}>
            <ProfileMenuItem
              icon={<Bell size={20} color={COLORS.black} />}
              title="Notifications"
              showToggle={true}
            />
            
            <ProfileMenuItem
              icon={<Settings size={20} color={COLORS.black} />}
              title="Preferences"
              onPress={() => {}}
            />
            
            <ProfileMenuItem
              icon={<Lock size={20} color={COLORS.black} />}
              title="Privacy & Security"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <View style={styles.settingsContainer}>
            <ProfileMenuItem
              icon={<HelpCircle size={20} color={COLORS.black} />}
              title="Help Center"
              onPress={() => {}}
            />
            
            <ProfileMenuItem
              icon={<LogOut size={20} color={COLORS.black} />}
              title="Sign Out"
              onPress={() => {}}
              isDestructive={true}
            />
          </View>
        </View>
        
        <Text style={styles.versionText}>FitCheck v1.0.0</Text>
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
    paddingBottom: SPACING.small,
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.beige,
    borderRadius: 16,
    padding: SPACING.medium,
    marginTop: SPACING.small,
    position: 'relative',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: SPACING.medium,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...TYPOGRAPHY.h3,
    color: COLORS.black,
  },
  profileEmail: {
    ...TYPOGRAPHY.body,
    color: COLORS.black,
    opacity: 0.7,
  },
  changePhotoButton: {
    position: 'absolute',
    bottom: 20,
    left: 60,
    backgroundColor: COLORS.green,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginTop: SPACING.medium,
    paddingVertical: SPACING.medium,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...TYPOGRAPHY.h2,
    color: COLORS.black,
  },
  statLabel: {
    ...TYPOGRAPHY.small,
    color: COLORS.black,
    opacity: 0.7,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  sectionContainer: {
    marginTop: SPACING.large,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.black,
    marginBottom: SPACING.small,
  },
  settingsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  versionText: {
    ...TYPOGRAPHY.small,
    color: COLORS.black,
    opacity: 0.5,
    textAlign: 'center',
    marginTop: SPACING.xxlarge,
  },
});