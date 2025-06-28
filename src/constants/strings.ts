export const strings = {
  // App metadata
  app: {
    name: 'Celestial Café',
    tagline: 'Brew the cosmos, one cup at a time ✨',
    version: '1.0.0',
  },
  
  // Navigation
  navigation: {
    home: 'Cosmic Home',
    menu: 'Stellar Menu',
    orders: 'Celestial Orders',
    profile: 'Astral Profile',
  },
  
  // Game mechanics
  game: {
    welcome: 'Welcome to the Celestial Café, where cosmic brews await!',
    tutorial: {
      step1: 'Brew cosmic elixirs for celestial customers',
      step2: 'Master the art of stellar mixology',
      step3: 'Unlock new recipes and cosmic powers',
    },
    achievements: {
      firstBrew: 'First Cosmic Brew',
      masterMixer: 'Master Mixologist',
      starCollector: 'Star Collector',
    },
  },
  
  // Customer interactions
  customers: {
    greeting: 'Greetings, cosmic traveler!',
    order: 'I seek a brew that will guide my stars...',
    satisfaction: {
      happy: 'The stars align with this brew!',
      neutral: 'A decent cosmic concoction.',
      unhappy: 'This brew disturbs my celestial harmony.',
    },
    names: [
      'Cosmic Traveler',
      'Stellar Wanderer',
      'Nebula Nomad',
      'Galaxy Guardian',
      'Astral Adventurer',
    ],
    orders: [
      'Stellar Brew',
      'Nebula Nectar',
      'Cosmic Cocoa',
      'Galactic Green Tea',
      'Astral Americano',
    ],
  },
  
  // UI elements
  ui: {
    buttons: {
      start: 'Begin Cosmic Journey',
      brew: 'Brew New Customer',
      serve: 'Serve Order',
      upgrade: 'Upgrade Shop',
      settings: 'Settings',
    },
    loading: 'Aligning cosmic energies...',
    error: 'Cosmic disturbance detected!',
    labels: {
      currency: 'Stardust',
      satisfaction: 'Satisfaction',
      patience: 'Patience',
    },
  },
  
  // Shop items
  shop: {
    upgrades: {
      brewSpeed: 'Temporal Acceleration',
      customerPatience: 'Celestial Patience',
      tipMultiplier: 'Cosmic Generosity',
    },
    ingredients: {
      stardust: 'Stardust Essence',
      moonbeam: 'Moonbeam Extract',
      sunray: 'Sunray Powder',
    },
  },
  
  achievements: {
    firstBrew: {
      title: 'First Steps',
      description: 'Brewed your first cosmic beverage',
    },
    masterBarista: {
      title: 'Master Barista',
      description: 'Served 100 customers with perfect satisfaction',
    },
    cosmicCollector: {
      title: 'Cosmic Collector',
      description: 'Earned 10,000 stardust',
    },
  },
} as const;

export type StringTheme = typeof strings;
