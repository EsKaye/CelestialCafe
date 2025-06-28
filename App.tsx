import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { colors } from './src/constants/colors';

export default function App() {
  return (
    <ErrorBoundary>
      <StatusBar style="light" backgroundColor={colors.backgrounds.main} />
      <AppNavigator />
    </ErrorBoundary>
  );
}
