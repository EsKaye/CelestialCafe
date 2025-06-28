import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Customer {
  id: string;
  name: string;
  drink: string;
  patience: number;
  satisfaction: number;
  mood: 'happy' | 'neutral' | 'unhappy';
  type: 'regular' | 'vip' | 'cosmic' | 'trader';
  tip: number;
  tradingInterest?: 'bullish' | 'bearish' | 'neutral';
}

export interface Drink {
  name: string;
  ingredients: string[];
  brewTime: number;
  description: string;
  rarity: 'common' | 'rare' | 'legendary';
  price: number;
  unlockLevel: number;
  marketEffect?: {
    type: 'bullish' | 'bearish' | 'neutral';
    strength: number;
  };
}

export interface CosmicAsset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  marketCap: number;
  volatility: number;
  trend: 'bullish' | 'bearish' | 'sideways';
}

export interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: number;
  profit?: number;
}

export interface GameState {
  // Resources
  stardust: number;
  cosmicPoints: number;
  level: number;
  experience: number;
  
  // Trading System
  cosmicCredits: number;
  portfolio: { [symbol: string]: number };
  trades: Trade[];
  marketData: { [symbol: string]: CosmicAsset };
  tradingLevel: number;
  tradingExperience: number;
  
  // Game State
  customers: Customer[];
  brewingDrinks: {[key: string]: number};
  unlockedDrinks: string[];
  unlockedDecorations: string[];
  unlockedAssets: string[];
  
  // Stats
  totalCustomersServed: number;
  totalTipsEarned: number;
  highestSatisfaction: number;
  totalTrades: number;
  totalProfit: number;
  
  // Actions
  addCustomer: (customer: Customer) => void;
  removeCustomer: (id: string) => void;
  startBrewing: (drink: Drink) => void;
  serveDrink: (customer: Customer, drink: Drink) => void;
  addStardust: (amount: number) => void;
  addCosmicPoints: (amount: number) => void;
  addExperience: (amount: number) => void;
  unlockDrink: (drinkName: string) => void;
  unlockDecoration: (decorationName: string) => void;
  
  // Trading Actions
  executeTrade: (symbol: string, type: 'buy' | 'sell', amount: number) => void;
  updateMarketData: (symbol: string, asset: CosmicAsset) => void;
  addTradingExperience: (amount: number) => void;
  unlockAsset: (symbol: string) => void;
  getPortfolioValue: () => number;
  getTotalProfit: () => number;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial State
      stardust: 100,
      cosmicPoints: 0,
      level: 1,
      experience: 0,
      cosmicCredits: 1000,
      portfolio: {},
      trades: [],
      marketData: {
        'STAR': { symbol: 'STAR', name: 'Stellar Token', price: 100, change: 2.5, volume: 1000000, marketCap: 10000000, volatility: 0.15, trend: 'bullish' },
        'NEB': { symbol: 'NEB', name: 'Nebula Coin', price: 50, change: -1.2, volume: 500000, marketCap: 5000000, volatility: 0.25, trend: 'bearish' },
        'COS': { symbol: 'COS', name: 'Cosmic Cash', price: 200, change: 5.0, volume: 2000000, marketCap: 20000000, volatility: 0.10, trend: 'bullish' },
      },
      tradingLevel: 1,
      tradingExperience: 0,
      customers: [],
      brewingDrinks: {},
      unlockedDrinks: ['Stellar Brew', 'Nebula Nectar'],
      unlockedDecorations: [],
      unlockedAssets: ['STAR'],
      totalCustomersServed: 0,
      totalTipsEarned: 0,
      highestSatisfaction: 0,
      totalTrades: 0,
      totalProfit: 0,

      // Actions
      addCustomer: (customer) => 
        set((state) => ({ customers: [...state.customers, customer] })),
      
      removeCustomer: (id) =>
        set((state) => ({ 
          customers: state.customers.filter(c => c.id !== id),
          totalCustomersServed: state.totalCustomersServed + 1
        })),
      
      startBrewing: (drink) =>
        set((state) => ({
          brewingDrinks: { ...state.brewingDrinks, [drink.name]: drink.brewTime },
          stardust: state.stardust - drink.price
        })),
      
      serveDrink: (customer, drink) =>
        set((state) => {
          const isCorrectDrink = customer.drink === drink.name;
          const satisfaction = isCorrectDrink ? 100 : 50;
          const tip = isCorrectDrink ? customer.tip : customer.tip / 2;
          const experience = isCorrectDrink ? 10 : 5;
          
          // Market effect from drinks
          let marketEffect = 0;
          if (drink.marketEffect && customer.tradingInterest) {
            if (drink.marketEffect.type === customer.tradingInterest) {
              marketEffect = drink.marketEffect.strength;
            }
          }
          
          return {
            customers: state.customers.filter(c => c.id !== customer.id),
            brewingDrinks: { ...state.brewingDrinks, [drink.name]: 0 },
            stardust: state.stardust + tip,
            totalTipsEarned: state.totalTipsEarned + tip,
            experience: state.experience + experience,
            highestSatisfaction: Math.max(state.highestSatisfaction, satisfaction),
            cosmicCredits: state.cosmicCredits + (marketEffect * 10)
          };
        }),
      
      addStardust: (amount) =>
        set((state) => ({ stardust: state.stardust + amount })),
      
      addCosmicPoints: (amount) =>
        set((state) => ({ cosmicPoints: state.cosmicPoints + amount })),
      
      addExperience: (amount) =>
        set((state) => {
          const newExperience = state.experience + amount;
          const experienceNeeded = state.level * 100;
          
          if (newExperience >= experienceNeeded) {
            return {
              experience: newExperience - experienceNeeded,
              level: state.level + 1
            };
          }
          
          return { experience: newExperience };
        }),
      
      unlockDrink: (drinkName) =>
        set((state) => ({
          unlockedDrinks: [...state.unlockedDrinks, drinkName]
        })),
      
      unlockDecoration: (decorationName) =>
        set((state) => ({
          unlockedDecorations: [...state.unlockedDecorations, decorationName]
        })),

      // Trading Actions
      executeTrade: (symbol, type, amount) =>
        set((state) => {
          const asset = state.marketData[symbol];
          if (!asset) return state;

          const totalCost = asset.price * amount;
          const currentHoldings = state.portfolio[symbol] || 0;

          if (type === 'buy') {
            if (state.cosmicCredits < totalCost) return state;
            
            const newPortfolio = { ...state.portfolio };
            newPortfolio[symbol] = currentHoldings + amount;
            
            return {
              cosmicCredits: state.cosmicCredits - totalCost,
              portfolio: newPortfolio,
              trades: [...state.trades, {
                id: Date.now().toString(),
                symbol,
                type,
                amount,
                price: asset.price,
                timestamp: Date.now()
              }],
              totalTrades: state.totalTrades + 1
            };
          } else {
            if (currentHoldings < amount) return state;
            
            const newPortfolio = { ...state.portfolio };
            newPortfolio[symbol] = currentHoldings - amount;
            if (newPortfolio[symbol] === 0) delete newPortfolio[symbol];
            
            const profit = (asset.price - (state.trades.find(t => t.symbol === symbol && t.type === 'buy')?.price || asset.price)) * amount;
            
            return {
              cosmicCredits: state.cosmicCredits + totalCost,
              portfolio: newPortfolio,
              trades: [...state.trades, {
                id: Date.now().toString(),
                symbol,
                type,
                amount,
                price: asset.price,
                timestamp: Date.now(),
                profit
              }],
              totalTrades: state.totalTrades + 1,
              totalProfit: state.totalProfit + (profit || 0)
            };
          }
        }),

      updateMarketData: (symbol, asset) =>
        set((state) => ({
          marketData: { ...state.marketData, [symbol]: asset }
        })),

      addTradingExperience: (amount) =>
        set((state) => {
          const newExperience = state.tradingExperience + amount;
          const experienceNeeded = state.tradingLevel * 50;
          
          if (newExperience >= experienceNeeded) {
            return {
              tradingExperience: newExperience - experienceNeeded,
              tradingLevel: state.tradingLevel + 1
            };
          }
          
          return { tradingExperience: newExperience };
        }),

      unlockAsset: (symbol) =>
        set((state) => ({
          unlockedAssets: [...state.unlockedAssets, symbol]
        })),

      getPortfolioValue: () => {
        const state = get();
        let totalValue = 0;
        Object.entries(state.portfolio).forEach(([symbol, amount]) => {
          const asset = state.marketData[symbol];
          if (asset) {
            totalValue += asset.price * amount;
          }
        });
        return totalValue;
      },

      getTotalProfit: () => {
        const state = get();
        return state.totalProfit;
      }
    }),
    {
      name: 'celestial-cafe-storage'
    }
  )
); 