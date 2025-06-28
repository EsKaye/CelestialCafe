import { Drink, Customer } from '../store/gameStore';

export const DRINKS: Drink[] = [
  {
    name: 'Stellar Brew',
    ingredients: ['Stardust', 'Moonbeam'],
    brewTime: 5,
    description: 'A classic cosmic coffee that warms the soul',
    rarity: 'common',
    price: 10,
    unlockLevel: 1,
    marketEffect: {
      type: 'bullish',
      strength: 1
    }
  },
  {
    name: 'Nebula Nectar',
    ingredients: ['Stardust', 'Sunray'],
    brewTime: 7,
    description: 'A sparkling drink that glows like distant galaxies',
    rarity: 'common',
    price: 15,
    unlockLevel: 1,
    marketEffect: {
      type: 'bearish',
      strength: 1
    }
  },
  {
    name: 'Galactic Green Tea',
    ingredients: ['Moonbeam', 'Sunray'],
    brewTime: 4,
    description: 'A calming brew that brings cosmic harmony',
    rarity: 'common',
    price: 12,
    unlockLevel: 2,
    marketEffect: {
      type: 'neutral',
      strength: 0.5
    }
  },
  {
    name: 'Black Hole Blend',
    ingredients: ['Stardust', 'Moonbeam', 'Sunray'],
    brewTime: 10,
    description: 'A mysterious drink that pulls you into its depths',
    rarity: 'rare',
    price: 25,
    unlockLevel: 3,
    marketEffect: {
      type: 'bullish',
      strength: 2
    }
  },
  {
    name: 'Supernova Shot',
    ingredients: ['Stardust', 'Stardust', 'Sunray'],
    brewTime: 8,
    description: 'An explosive energy drink that lights up your day',
    rarity: 'rare',
    price: 30,
    unlockLevel: 4,
    marketEffect: {
      type: 'bearish',
      strength: 2
    }
  },
  {
    name: 'Celestial Elixir',
    ingredients: ['Moonbeam', 'Moonbeam', 'Sunray'],
    brewTime: 12,
    description: 'A legendary drink that grants cosmic wisdom',
    rarity: 'legendary',
    price: 50,
    unlockLevel: 5,
    marketEffect: {
      type: 'bullish',
      strength: 3
    }
  },
  {
    name: 'Quantum Quencher',
    ingredients: ['Stardust', 'Moonbeam', 'Sunray', 'Cosmic Dust'],
    brewTime: 15,
    description: 'A drink that bends market reality',
    rarity: 'legendary',
    price: 75,
    unlockLevel: 6,
    marketEffect: {
      type: 'neutral',
      strength: 5
    }
  }
];

export const CUSTOMER_TYPES = {
  regular: {
    patience: 100,
    baseTip: 10,
    spawnRate: 0.5
  },
  vip: {
    patience: 150,
    baseTip: 25,
    spawnRate: 0.2
  },
  cosmic: {
    patience: 200,
    baseTip: 50,
    spawnRate: 0.1
  },
  trader: {
    patience: 120,
    baseTip: 30,
    spawnRate: 0.2
  }
};

export const CUSTOMER_NAMES = [
  'Stardust Seeker',
  'Nebula Nomad',
  'Cosmic Wanderer',
  'Galaxy Guardian',
  'Moonlight Merchant',
  'Solar Sailor',
  'Astral Artist',
  'Celestial Scholar',
  'Void Voyager',
  'Quantum Quester',
  'Trading Titan',
  'Market Master',
  'Portfolio Pro',
  'Bull Market Baron',
  'Bear Market Baroness'
];

export const DECORATIONS = [
  {
    name: 'Starlit Counter',
    description: 'A glowing counter that attracts more customers',
    price: 100,
    effect: 'customerSpawnRate',
    value: 1.1
  },
  {
    name: 'Cosmic Chandelier',
    description: 'Increases tips from all customers',
    price: 200,
    effect: 'tipMultiplier',
    value: 1.2
  },
  {
    name: 'Nebula Wallpaper',
    description: 'Makes customers more patient',
    price: 150,
    effect: 'patienceMultiplier',
    value: 1.15
  },
  {
    name: 'Galactic Garden',
    description: 'Attracts VIP customers',
    price: 300,
    effect: 'vipSpawnRate',
    value: 1.25
  },
  {
    name: 'Trading Terminal',
    description: 'Attracts trader customers and improves market insights',
    price: 500,
    effect: 'traderSpawnRate',
    value: 1.3
  },
  {
    name: 'Market Monitor',
    description: 'Provides real-time market data and trading signals',
    price: 750,
    effect: 'marketInsights',
    value: 1.5
  }
];

export const COSMIC_ASSETS = [
  {
    symbol: 'STAR',
    name: 'Stellar Token',
    basePrice: 100,
    volatility: 0.15,
    description: 'The most stable cosmic currency'
  },
  {
    symbol: 'NEB',
    name: 'Nebula Coin',
    basePrice: 50,
    volatility: 0.25,
    description: 'Volatile but potentially rewarding'
  },
  {
    symbol: 'COS',
    name: 'Cosmic Cash',
    basePrice: 200,
    volatility: 0.10,
    description: 'Premium cosmic currency'
  },
  {
    symbol: 'QUA',
    name: 'Quantum Token',
    basePrice: 150,
    volatility: 0.30,
    description: 'Highly volatile quantum currency'
  },
  {
    symbol: 'VOID',
    name: 'Void Coin',
    basePrice: 75,
    volatility: 0.20,
    description: 'Mysterious void-based currency'
  }
];

export const generateCustomer = (level: number): Customer => {
  const type = Math.random() < CUSTOMER_TYPES.trader.spawnRate ? 'trader' :
               Math.random() < CUSTOMER_TYPES.vip.spawnRate ? 'vip' : 
               Math.random() < CUSTOMER_TYPES.cosmic.spawnRate ? 'cosmic' : 'regular';
  
  const customerType = CUSTOMER_TYPES[type];
  const name = CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)];
  const drink = DRINKS[Math.floor(Math.random() * Math.min(level + 1, DRINKS.length))].name;
  
  // Add trading interest for trader customers
  const tradingInterest = type === 'trader' ? 
    ['bullish', 'bearish', 'neutral'][Math.floor(Math.random() * 3)] as 'bullish' | 'bearish' | 'neutral' :
    undefined;
  
  return {
    id: Date.now().toString(),
    name,
    drink,
    patience: customerType.patience,
    satisfaction: 100,
    mood: 'happy',
    type,
    tip: customerType.baseTip * (1 + (level * 0.1)),
    tradingInterest
  };
};

export const updateMarketPrices = (marketData: any) => {
  const updated = { ...marketData };
  
  Object.keys(updated).forEach(symbol => {
    const asset = updated[symbol];
    const volatility = asset.volatility;
    const changePercent = (Math.random() - 0.5) * volatility * 100;
    const newPrice = asset.price * (1 + changePercent / 100);
    
    updated[symbol] = {
      ...asset,
      price: Math.max(1, newPrice),
      change: changePercent,
      trend: changePercent > 1 ? 'bullish' : changePercent < -1 ? 'bearish' : 'sideways'
    };
  });
  
  return updated;
}; 