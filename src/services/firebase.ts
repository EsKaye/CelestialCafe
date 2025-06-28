import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };

// Game data types
export interface GameProgress {
  userId: string;
  level: number;
  experience: number;
  currency: number;
  unlockedRecipes: string[];
  achievements: string[];
  lastPlayed: Date;
}

export interface UserProfile {
  userId: string;
  username: string;
  avatarUrl?: string;
  createdAt: Date;
  lastLogin: Date;
}

// Game data management functions
export const saveGameProgress = async (progress: GameProgress): Promise<void> => {
  try {
    const gameProgressRef = doc(db, 'gameProgress', progress.userId);
    await setDoc(gameProgressRef, progress);
  } catch (error) {
    console.error('Error saving game progress:', error);
    throw error;
  }
};

export const loadGameProgress = async (userId: string): Promise<GameProgress | null> => {
  try {
    const gameProgressRef = doc(db, 'gameProgress', userId);
    const docSnap = await getDoc(gameProgressRef);
    return docSnap.exists() ? (docSnap.data() as GameProgress) : null;
  } catch (error) {
    console.error('Error loading game progress:', error);
    throw error;
  }
};

export const updateUserProfile = async (profile: UserProfile): Promise<void> => {
  try {
    const userRef = doc(db, 'users', profile.userId);
    await setDoc(userRef, profile);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};
