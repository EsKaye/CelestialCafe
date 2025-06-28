import { Drink, Customer } from '../store/gameStore';

export const DRINKS: Drink[] = [
  {
    name: 'Stellar Brew',
    ingredients: ['Stardust', 'Moonbeam'],
    brewTime: 5,
    description: 'A classic cosmic coffee that warms the soul',
    rarity: 'common',
    price: 10,
    unlockLevel: 1
  },
  {
    name: 'Nebula Nectar',
    ingredients: ['Stardust', 'Sunray'],
    brewTime: 7,
    description: 'A sparkling drink that glows like distant galaxies',
    rarity: 'common',
    price: 15,
    unlockLevel: 1
  },
  {
    name: 'Galactic Green Tea',
    ingredients: ['Moonbeam', 'Sunray'],
    brewTime: 4,
    description: 'A calming brew that brings cosmic harmony',
    rarity: 'common',
    price: 12,
    unlockLevel: 2
  },
  {
    name: 'Black Hole Blend',
    ingredients: ['Stardust', 'Moonbeam', 'Sunray'],
    brewTime: 10,
    description: 'A mysterious drink that pulls you into its depths',
    rarity: 'rare',
    price: 25,
    unlockLevel: 3
  },
  {
    name: 'Supernova Shot',
    ingredients: ['Stardust', 'Stardust', 'Sunray'],
    brewTime: 8,
    description: 'An explosive energy drink that lights up your day',
    rarity: 'rare',
    price: 30,
    unlockLevel: 4
  },
  {
    name: 'Celestial Elixir',
    ingredients: ['Moonbeam', 'Moonbeam', 'Sunray'],
    brewTime: 12,
    description: 'A legendary drink that grants cosmic wisdom',
    rarity: 'legendary',
    price: 50,
    unlockLevel: 5
  }
];

export const CUSTOMER_TYPES = {
  regular: {
    patience: 100,
    baseTip: 10,
    spawnRate: 0.7
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
  'Quantum Quester'
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
  }
];

export const generateCustomer = (level: number): Customer => {
  const type = Math.random() < CUSTOMER_TYPES.vip.spawnRate ? 'vip' : 
               Math.random() < CUSTOMER_TYPES.cosmic.spawnRate ? 'cosmic' : 'regular';
  
  const customerType = CUSTOMER_TYPES[type];
  const name = CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)];
  const drink = DRINKS[Math.floor(Math.random() * Math.min(level + 1, DRINKS.length))].name;
  
  return {
    id: Date.now().toString(),
    name,
    drink,
    patience: customerType.patience,
    satisfaction: 100,
    mood: 'happy',
    type,
    tip: customerType.baseTip * (1 + (level * 0.1))
  };
}; 