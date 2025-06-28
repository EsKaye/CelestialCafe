import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { colors } from '../constants/colors';
import { strings } from '../constants/strings';
import { CosmicButton } from '../components/ui/CosmicButton';
import { CosmicBackground } from '../components/animations/CosmicBackground';

const { width } = Dimensions.get('window');

interface Specialization {
  id: string;
  name: string;
  description: string;
  icon: string;
  bonus: string;
  isSecret?: boolean;
}

const specializations: Specialization[] = [
  {
    id: 'terrestrial',
    name: 'Terrestrial Realm',
    description: 'Master the art of brewing with earthly creatures. Unlock special recipes with bugs and small animals.',
    icon: '🐞',
    bonus: '+20% satisfaction from terrestrial customers',
  },
  {
    id: 'aquatic',
    name: 'Aquatic Domain',
    description: 'Dive into the mysteries of the deep. Create magical brews with fish and sea creatures.',
    icon: '🐠',
    bonus: '+20% satisfaction from aquatic customers',
  },
  {
    id: 'avian',
    name: 'Avian Heights',
    description: 'Soar to new heights with winged companions. Craft celestial drinks with birds and flying creatures.',
    icon: '🦅',
    bonus: '+20% satisfaction from avian customers',
  },
  {
    id: 'dragon',
    name: 'Dragon\'s Legacy',
    description: 'A rare and ancient path, only revealed on special cosmic alignments.',
    icon: '🐉',
    bonus: '+50% satisfaction from all customers',
    isSecret: true,
  },
];

export const SpecializationScreen: React.FC<{
  onSelect: (specialization: Specialization) => void;
}> = ({ onSelect }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showSecret, setShowSecret] = useState(false);
  
  // Check if today is a special day (e.g., full moon, solstice, etc.)
  const isSpecialDay = new Date().getDate() === 1; // Example: Show dragon on 1st of each month

  const handleSelect = (specialization: Specialization) => {
    if (specialization.isSecret && !isSpecialDay) {
      return;
    }
    setSelectedId(specialization.id);
  };

  const handleConfirm = () => {
    if (selectedId) {
      const specialization = specializations.find(s => s.id === selectedId);
      if (specialization) {
        onSelect(specialization);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CosmicBackground />
      
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Choose Your Cosmic Path</Text>
        <Text style={styles.subtitle}>Select your specialization to begin your journey</Text>

        <View style={styles.optionsContainer}>
          {specializations.map((spec) => {
            if (spec.isSecret && !isSpecialDay) return null;
            
            const isSelected = selectedId === spec.id;
            const scale = useSharedValue(1);
            
            const animatedStyle = useAnimatedStyle(() => ({
              transform: [{ scale: scale.value }],
            }));

            const handlePress = () => {
              scale.value = withSequence(
                withSpring(0.95),
                withSpring(1)
              );
              handleSelect(spec);
            };

            return (
              <Animated.View
                key={spec.id}
                style={[
                  styles.optionCard,
                  isSelected && styles.selectedCard,
                  animatedStyle,
                ]}
              >
                <TouchableOpacity
                  onPress={handlePress}
                  style={styles.optionContent}
                >
                  <Text style={styles.optionIcon}>{spec.icon}</Text>
                  <Text style={styles.optionName}>{spec.name}</Text>
                  <Text style={styles.optionDescription}>{spec.description}</Text>
                  <Text style={styles.optionBonus}>{spec.bonus}</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        <CosmicButton
          title="Begin Journey"
          onPress={handleConfirm}
          variant="primary"
          disabled={!selectedId}
          style={styles.confirmButton}
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    backgroundColor: colors.backgrounds.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.cosmic.primary,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: colors.cosmic.accent,
    backgroundColor: colors.backgrounds.modal,
  },
  optionContent: {
    alignItems: 'center',
  },
  optionIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  optionName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 12,
  },
  optionBonus: {
    fontSize: 14,
    color: colors.cosmic.accent,
    fontWeight: '600',
  },
  confirmButton: {
    marginTop: 32,
    marginBottom: 40,
  },
}); 