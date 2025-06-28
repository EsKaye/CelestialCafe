import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import { useGameStore, Customer } from '../store/gameStore';
import { DRINKS, generateCustomer, DECORATIONS } from '../data/gameData';
import { Drink } from '../store/gameStore';

const getRarityColor = (rarity: Drink['rarity']) => {
  switch (rarity) {
    case 'common':
      return colors.text.secondary;
    case 'rare':
      return colors.cosmic.secondary;
    case 'legendary':
      return colors.cosmic.accent;
  }
};

const getMoodEmoji = (mood: 'happy' | 'neutral' | 'unhappy') => {
  switch (mood) {
    case 'happy':
      return '✨';
    case 'neutral':
      return '🌙';
    case 'unhappy':
      return '💫';
  }
};

const getCustomerTypeEmoji = (type: 'regular' | 'vip' | 'cosmic') => {
  switch (type) {
    case 'regular':
      return '⭐️';
    case 'vip':
      return '🌟';
    case 'cosmic':
      return '🌠';
  }
};

export const GameScreen: React.FC = () => {
  const {
    stardust,
    level,
    experience,
    customers,
    brewingDrinks,
    unlockedDrinks,
    unlockedDecorations,
    addCustomer,
    removeCustomer,
    startBrewing,
    serveDrink,
    addExperience
  } = useGameStore();

  const [selectedDrink, setSelectedDrink] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{message: string; type: 'success' | 'error'} | null>(null);
  const [showShop, setShowShop] = useState(false);

  // Spawn new customers
  useEffect(() => {
    const spawnCustomer = () => {
      const newCustomer = generateCustomer(level);
      addCustomer(newCustomer);
    };

    const interval = setInterval(spawnCustomer, 10000);
    return () => clearInterval(interval);
  }, [level]);

  // Decrease customer patience
  useEffect(() => {
    const decreasePatience = () => {
      customers.forEach(customer => {
        if (customer.patience <= 0) {
          removeCustomer(customer.id);
          setFeedback({
            message: `${customer.name} left without their drink...`,
            type: 'error'
          });
        }
      });
    };

    const interval = setInterval(decreasePatience, 1000);
    return () => clearInterval(interval);
  }, [customers]);

  // Update brewing drinks
  useEffect(() => {
    const updateBrewing = () => {
      Object.entries(brewingDrinks).forEach(([drinkName, timeLeft]) => {
        if (timeLeft <= 0) {
          setFeedback({
            message: `${drinkName} is ready!`,
            type: 'success'
          });
        }
      });
    };

    const interval = setInterval(updateBrewing, 1000);
    return () => clearInterval(interval);
  }, [brewingDrinks]);

  const handleStartBrewing = (drink: Drink) => {
    if (stardust >= drink.price) {
      startBrewing(drink);
      setFeedback({
        message: `Started brewing ${drink.name}...`,
        type: 'success'
      });
    } else {
      setFeedback({
        message: 'Not enough stardust!',
        type: 'error'
      });
    }
  };

  const handleServeDrink = (customer: Customer) => {
    const drink = DRINKS.find(d => d.name === customer.drink);
    if (drink && brewingDrinks[drink.name] === 0) {
      serveDrink(customer, drink);
      addExperience(10);
      setFeedback({
        message: `${customer.name} loved their ${drink.name}!`,
        type: 'success'
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Celestial Café</Text>
          <Text style={styles.levelText}>Level {level}</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.resourceContainer}>
            <Text style={styles.resourceText}>✨ {stardust}</Text>
          </View>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={() => setShowShop(!showShop)}
          >
            <Text style={styles.shopButtonText}>🛍️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Experience Bar */}
      <View style={styles.experienceBar}>
        <View 
          style={[
            styles.experienceFill,
            { width: `${(experience / (level * 100)) * 100}%` }
          ]} 
        />
      </View>

      {/* Feedback Message */}
      {feedback && (
        <Animated.View 
          style={[
            styles.feedbackContainer,
            { backgroundColor: feedback.type === 'success' ? colors.ui.success + '20' : colors.ui.error + '20' }
          ]}
        >
          <Text style={[
            styles.feedbackText,
            { color: feedback.type === 'success' ? colors.ui.success : colors.ui.error }
          ]}>
            {feedback.message}
          </Text>
        </Animated.View>
      )}

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* Customers Queue */}
        <View style={styles.customersContainer}>
          {customers.map(customer => (
            <View key={customer.id} style={styles.customerCard}>
              <View style={styles.customerInfo}>
                <View style={styles.customerHeader}>
                  <Text style={styles.customerName}>
                    {getCustomerTypeEmoji(customer.type)} {customer.name}
                  </Text>
                  <Text style={styles.moodEmoji}>{getMoodEmoji(customer.mood)}</Text>
                </View>
                <Text style={styles.drinkName}>{customer.drink}</Text>
              </View>
              <View style={styles.patienceBar}>
                <View 
                  style={[
                    styles.patienceFill,
                    { width: `${(customer.patience / 100) * 100}%` },
                    { backgroundColor: customer.patience > 50 ? colors.ui.success : colors.ui.warning }
                  ]} 
                />
              </View>
              {brewingDrinks[customer.drink] === 0 && (
                <TouchableOpacity 
                  style={styles.serveButton}
                  onPress={() => handleServeDrink(customer)}
                >
                  <Text style={styles.serveButtonText}>Serve</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Drinks Menu */}
        <View style={styles.drinksContainer}>
          <Text style={styles.sectionTitle}>Cosmic Menu</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {DRINKS.filter(drink => unlockedDrinks.includes(drink.name)).map(drink => (
              <TouchableOpacity
                key={drink.name}
                style={[
                  styles.drinkCard,
                  selectedDrink === drink.name && styles.selectedDrinkCard
                ]}
                onPress={() => setSelectedDrink(drink.name)}
              >
                <Text style={[styles.drinkName, { color: getRarityColor(drink.rarity) }]}>
                  {drink.name}
                </Text>
                <Text style={styles.drinkDescription}>{drink.description}</Text>
                <Text style={styles.drinkPrice}>✨ {drink.price}</Text>
                {brewingDrinks[drink.name] > 0 ? (
                  <Text style={styles.brewingText}>Brewing... {brewingDrinks[drink.name]}s</Text>
                ) : (
                  <TouchableOpacity
                    style={styles.brewButton}
                    onPress={() => handleStartBrewing(drink)}
                  >
                    <Text style={styles.brewButtonText}>Brew</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Shop */}
        {showShop && (
          <View style={styles.shopContainer}>
            <Text style={styles.sectionTitle}>Cosmic Shop</Text>
            {DECORATIONS.map(decoration => (
              <TouchableOpacity
                key={decoration.name}
                style={styles.decorationCard}
                onPress={() => {
                  if (stardust >= decoration.price) {
                    // Handle decoration purchase
                    setFeedback({
                      message: `Purchased ${decoration.name}!`,
                      type: 'success'
                    });
                  } else {
                    setFeedback({
                      message: 'Not enough stardust!',
                      type: 'error'
                    });
                  }
                }}
              >
                <Text style={styles.decorationName}>{decoration.name}</Text>
                <Text style={styles.decorationDescription}>{decoration.description}</Text>
                <Text style={styles.decorationPrice}>✨ {decoration.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgrounds.main,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: colors.backgrounds.card,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: fonts.primary.bold,
    color: colors.text.primary,
  },
  levelText: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: colors.text.secondary,
  },
  resourceContainer: {
    backgroundColor: colors.backgrounds.modal,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  resourceText: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: colors.text.primary,
  },
  shopButton: {
    padding: 8,
  },
  shopButtonText: {
    fontSize: 24,
  },
  experienceBar: {
    height: 4,
    backgroundColor: colors.backgrounds.modal,
  },
  experienceFill: {
    height: '100%',
    backgroundColor: colors.cosmic.primary,
  },
  feedbackContainer: {
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  feedbackText: {
    fontSize: 14,
    fontFamily: fonts.primary.medium,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  customersContainer: {
    padding: 10,
  },
  customerCard: {
    backgroundColor: colors.backgrounds.card,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  customerInfo: {
    marginBottom: 10,
  },
  customerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  customerName: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: colors.text.primary,
  },
  moodEmoji: {
    fontSize: 20,
  },
  drinkName: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: colors.text.secondary,
  },
  patienceBar: {
    height: 4,
    backgroundColor: colors.backgrounds.modal,
    borderRadius: 2,
    marginBottom: 10,
  },
  patienceFill: {
    height: '100%',
    borderRadius: 2,
  },
  serveButton: {
    backgroundColor: colors.cosmic.primary,
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  serveButtonText: {
    color: colors.text.primary,
    fontFamily: fonts.primary.medium,
  },
  drinksContainer: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: fonts.primary.bold,
    color: colors.text.primary,
    marginBottom: 15,
  },
  drinkCard: {
    backgroundColor: colors.backgrounds.card,
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
    width: 200,
  },
  selectedDrinkCard: {
    borderColor: colors.cosmic.primary,
    borderWidth: 2,
  },
  drinkDescription: {
    fontSize: 12,
    fontFamily: fonts.primary.regular,
    color: colors.text.secondary,
    marginVertical: 5,
  },
  drinkPrice: {
    fontSize: 14,
    fontFamily: fonts.primary.medium,
    color: colors.cosmic.accent,
    marginBottom: 10,
  },
  brewingText: {
    fontSize: 12,
    fontFamily: fonts.primary.regular,
    color: colors.ui.info,
    textAlign: 'center',
  },
  brewButton: {
    backgroundColor: colors.cosmic.secondary,
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  brewButtonText: {
    color: colors.text.primary,
    fontFamily: fonts.primary.medium,
  },
  shopContainer: {
    padding: 10,
  },
  decorationCard: {
    backgroundColor: colors.backgrounds.card,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  decorationName: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: colors.text.primary,
    marginBottom: 5,
  },
  decorationDescription: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: colors.text.secondary,
    marginBottom: 10,
  },
  decorationPrice: {
    fontSize: 14,
    fontFamily: fonts.primary.medium,
    color: colors.cosmic.accent,
  },
}); 