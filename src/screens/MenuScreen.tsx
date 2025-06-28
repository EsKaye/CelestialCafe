import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../constants/colors';
import { strings } from '../constants/strings';
import { CosmicButton } from '../components/ui/CosmicButton';
import { CosmicBackground } from '../components/animations/CosmicBackground';

interface Drink {
  id: string;
  name: string;
  description: string;
  price: number;
  ingredients: string[];
  unlocked: boolean;
}

const drinks: Drink[] = [
  {
    id: 'stellar-brew',
    name: 'Stellar Brew',
    description: 'A cosmic blend of stardust and moonbeams',
    price: 100,
    ingredients: ['Stardust Essence', 'Moonbeam Extract'],
    unlocked: true,
  },
  {
    id: 'nebula-nectar',
    name: 'Nebula Nectar',
    description: 'Swirling colors of distant nebulae',
    price: 150,
    ingredients: ['Nebula Powder', 'Cosmic Syrup'],
    unlocked: false,
  },
  {
    id: 'galactic-green',
    name: 'Galactic Green Tea',
    description: 'Ancient wisdom in every sip',
    price: 200,
    ingredients: ['Galactic Leaves', 'Stellar Water'],
    unlocked: false,
  },
];

export const MenuScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <CosmicBackground />
      
      <ScrollView style={styles.scrollView}>
        {drinks.map((drink) => (
          <View key={drink.id} style={styles.drinkCard}>
            <View style={styles.drinkHeader}>
              <Text style={styles.drinkName}>{drink.name}</Text>
              <Text style={styles.drinkPrice}>{drink.price} ⭐</Text>
            </View>
            
            <Text style={styles.drinkDescription}>{drink.description}</Text>
            
            <View style={styles.ingredientsContainer}>
              {drink.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientTag}>
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>

            <CosmicButton
              title={drink.unlocked ? 'Brew' : 'Locked'}
              onPress={() => {}}
              variant={drink.unlocked ? 'primary' : 'tertiary'}
              disabled={!drink.unlocked}
              size="small"
            />
          </View>
        ))}
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
  drinkCard: {
    backgroundColor: colors.backgrounds.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.cosmic.primary,
  },
  drinkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  drinkName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  drinkPrice: {
    fontSize: 18,
    color: colors.cosmic.accent,
  },
  drinkDescription: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  ingredientTag: {
    backgroundColor: colors.backgrounds.modal,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  ingredientText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
}); 