import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../constants/colors';
import { strings } from '../constants/strings';
import { CosmicButton } from '../components/ui/CosmicButton';
import { CosmicBackground } from '../components/animations/CosmicBackground';

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  progress: number;
  total: number;
}

const achievements: Achievement[] = [
  {
    id: 'first-brew',
    title: 'First Steps',
    description: 'Brewed your first cosmic beverage',
    unlocked: true,
    progress: 1,
    total: 1,
  },
  {
    id: 'master-barista',
    title: 'Master Barista',
    description: 'Served 100 customers with perfect satisfaction',
    unlocked: false,
    progress: 45,
    total: 100,
  },
  {
    id: 'cosmic-collector',
    title: 'Cosmic Collector',
    description: 'Earned 10,000 stardust',
    unlocked: false,
    progress: 2500,
    total: 10000,
  },
];

interface Stat {
  label: string;
  value: string | number;
}

const stats: Stat[] = [
  { label: 'Total Orders', value: 156 },
  { label: 'Perfect Serves', value: 89 },
  { label: 'Stardust Earned', value: '12,450 ⭐' },
  { label: 'Customer Rating', value: '4.8/5.0' },
];

export const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <CosmicBackground />
      
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>✨</Text>
          </View>
          <Text style={styles.name}>Cosmic Barista</Text>
          <Text style={styles.level}>Level 5</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <Text style={styles.sectionTitle}>Achievements</Text>
        {achievements.map((achievement) => (
          <View key={achievement.id} style={styles.achievementCard}>
            <View style={styles.achievementHeader}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={[
                styles.achievementStatus,
                { color: achievement.unlocked ? colors.status.success : colors.text.secondary }
              ]}>
                {achievement.unlocked ? 'Unlocked' : 'Locked'}
              </Text>
            </View>
            
            <Text style={styles.achievementDescription}>
              {achievement.description}
            </Text>

            {!achievement.unlocked && (
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${(achievement.progress / achievement.total) * 100}%` },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {achievement.progress}/{achievement.total}
                </Text>
              </View>
            )}
          </View>
        ))}

        {/* Settings Button */}
        <CosmicButton
          title="Settings"
          onPress={() => {}}
          variant="secondary"
          style={styles.settingsButton}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgrounds.main,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.backgrounds.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.cosmic.primary,
  },
  avatarText: {
    fontSize: 40,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  level: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    marginBottom: 24,
  },
  statCard: {
    width: '50%',
    padding: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  achievementCard: {
    backgroundColor: colors.backgrounds.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.cosmic.primary,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  achievementStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  achievementDescription: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: colors.backgrounds.modal,
    borderRadius: 2,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.cosmic.primary,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  settingsButton: {
    marginTop: 8,
    marginBottom: 24,
  },
}); 