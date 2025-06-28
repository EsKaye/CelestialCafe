import { colors } from '../constants/colors';

/**
 * Generates a random number between min and max (inclusive)
 */
export const randomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Formats a number as currency with cosmic symbols
 */
export const formatCurrency = (amount: number): string => {
  return `✨${amount.toLocaleString()}`;
};

/**
 * Calculates customer satisfaction based on brew quality and time
 */
export const calculateSatisfaction = (
  brewQuality: number,
  waitTime: number,
  maxWaitTime: number
): number => {
  const timeFactor = Math.max(0, 1 - waitTime / maxWaitTime);
  return (brewQuality * 0.7 + timeFactor * 0.3) * 100;
};

/**
 * Generates a cosmic-themed customer name
 */
export const generateCustomerName = (): string => {
  const prefixes = ['Star', 'Moon', 'Nova', 'Cosmic', 'Astral'];
  const suffixes = ['Walker', 'Seeker', 'Dreamer', 'Traveler', 'Wanderer'];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${prefix}${suffix}`;
};

/**
 * Creates a glowing effect style object
 */
export const createGlowEffect = (color: string = colors.cosmic.primary): object => {
  return {
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  };
};

/**
 * Debounces a function call
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Generates a unique ID for game entities
 */
export const generateId = (): string => {
  return `celestial_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
