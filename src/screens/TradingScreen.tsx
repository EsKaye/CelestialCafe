import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import { useGameStore } from '../store/gameStore';

export const TradingScreen: React.FC = () => {
  const {
    cosmicCredits,
    portfolio,
    marketData,
    tradingLevel,
    tradingExperience,
    executeTrade,
    getPortfolioValue,
    getTotalProfit
  } = useGameStore();

  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  const handleTrade = () => {
    if (!selectedAsset || !tradeAmount) {
      Alert.alert('Error', 'Please select an asset and enter amount');
      return;
    }

    const amount = parseInt(tradeAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    executeTrade(selectedAsset, tradeType, amount);
    setTradeAmount('');
    Alert.alert('Success', `${tradeType === 'buy' ? 'Bought' : 'Sold'} ${amount} ${selectedAsset}`);
  };

  const portfolioValue = getPortfolioValue();
  const totalProfit = getTotalProfit();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cosmic Market</Text>
        <View style={styles.headerStats}>
          <Text style={styles.statText}>💰 {cosmicCredits.toFixed(0)}</Text>
          <Text style={styles.statText}>📊 Lv.{tradingLevel}</Text>
        </View>
      </View>

      {/* Portfolio Summary */}
      <View style={styles.portfolioCard}>
        <Text style={styles.sectionTitle}>Portfolio</Text>
        <View style={styles.portfolioStats}>
          <Text style={styles.portfolioValue}>${portfolioValue.toFixed(2)}</Text>
          <Text style={[styles.portfolioProfit, { color: totalProfit >= 0 ? colors.ui.success : colors.ui.error }]}>
            {totalProfit >= 0 ? '+' : ''}{totalProfit.toFixed(2)}
          </Text>
        </View>
        <Text style={styles.experienceText}>XP: {tradingExperience}/{tradingLevel * 50}</Text>
      </View>

      {/* Market Data */}
      <ScrollView style={styles.marketContainer}>
        <Text style={styles.sectionTitle}>Market</Text>
        {Object.entries(marketData).map(([symbol, asset]) => (
          <TouchableOpacity
            key={symbol}
            style={[
              styles.assetCard,
              selectedAsset === symbol && styles.selectedAssetCard
            ]}
            onPress={() => setSelectedAsset(symbol)}
          >
            <View style={styles.assetHeader}>
              <Text style={styles.assetSymbol}>{symbol}</Text>
              <Text style={styles.assetName}>{asset.name}</Text>
              <Text style={styles.trendIcon}>
                {asset.trend === 'bullish' ? '📈' : asset.trend === 'bearish' ? '📉' : '➡️'}
              </Text>
            </View>
            <View style={styles.assetPrice}>
              <Text style={styles.priceText}>${asset.price.toFixed(2)}</Text>
              <Text style={[
                styles.changeText,
                { color: asset.change >= 0 ? colors.ui.success : colors.ui.error }
              ]}>
                {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%
              </Text>
            </View>
            {portfolio[symbol] && (
              <Text style={styles.holdingsText}>Holdings: {portfolio[symbol]}</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Trading Panel */}
      {selectedAsset && (
        <View style={styles.tradingPanel}>
          <Text style={styles.sectionTitle}>Trade {selectedAsset}</Text>
          
          <View style={styles.tradeTypeSelector}>
            <TouchableOpacity
              style={[
                styles.tradeTypeButton,
                tradeType === 'buy' && styles.activeTradeType
              ]}
              onPress={() => setTradeType('buy')}
            >
              <Text style={styles.tradeTypeText}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tradeTypeButton,
                tradeType === 'sell' && styles.activeTradeType
              ]}
              onPress={() => setTradeType('sell')}
            >
              <Text style={styles.tradeTypeText}>Sell</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.amountInput}
            placeholder="Amount"
            value={tradeAmount}
            onChangeText={setTradeAmount}
            keyboardType="numeric"
            placeholderTextColor={colors.text.secondary}
          />

          <TouchableOpacity
            style={[
              styles.tradeButton,
              { backgroundColor: tradeType === 'buy' ? colors.ui.success : colors.ui.error }
            ]}
            onPress={handleTrade}
          >
            <Text style={styles.tradeButtonText}>
              {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedAsset}
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
  headerTitle: {
    fontSize: 24,
    fontFamily: fonts.primary.bold,
    color: colors.text.primary,
  },
  headerStats: {
    flexDirection: 'row',
    gap: 15,
  },
  statText: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: colors.text.primary,
  },
  portfolioCard: {
    backgroundColor: colors.backgrounds.card,
    margin: 15,
    padding: 15,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: colors.text.primary,
    marginBottom: 10,
  },
  portfolioStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  portfolioValue: {
    fontSize: 20,
    fontFamily: fonts.primary.bold,
    color: colors.text.primary,
  },
  portfolioProfit: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
  },
  experienceText: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: colors.text.secondary,
  },
  marketContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  assetCard: {
    backgroundColor: colors.backgrounds.card,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  selectedAssetCard: {
    borderColor: colors.cosmic.primary,
    borderWidth: 2,
  },
  assetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  assetSymbol: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: colors.text.primary,
  },
  assetName: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: colors.text.secondary,
    flex: 1,
    marginLeft: 10,
  },
  trendIcon: {
    fontSize: 20,
  },
  assetPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: colors.text.primary,
  },
  changeText: {
    fontSize: 14,
    fontFamily: fonts.primary.medium,
  },
  holdingsText: {
    fontSize: 12,
    fontFamily: fonts.primary.regular,
    color: colors.text.secondary,
    marginTop: 5,
  },
  tradingPanel: {
    backgroundColor: colors.backgrounds.card,
    margin: 15,
    padding: 15,
    borderRadius: 12,
  },
  tradeTypeSelector: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  tradeTypeButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: colors.backgrounds.modal,
  },
  activeTradeType: {
    backgroundColor: colors.cosmic.primary,
  },
  tradeTypeText: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: colors.text.primary,
  },
  amountInput: {
    backgroundColor: colors.backgrounds.modal,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    color: colors.text.primary,
    marginBottom: 15,
  },
  tradeButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tradeButtonText: {
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: colors.text.primary,
  },
}); 