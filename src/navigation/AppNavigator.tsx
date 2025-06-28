import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GameScreen } from '../screens/GameScreen';
import { TradingScreen } from '../screens/TradingScreen';
import { colors } from '../constants/colors';
import { strings } from '../constants/strings';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Cafe"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.backgrounds.card,
            borderTopColor: colors.cosmic.primary + '20',
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: colors.cosmic.primary,
          tabBarInactiveTintColor: colors.text.secondary,
          tabBarLabelStyle: {
            fontFamily: 'SpaceGrotesk-Medium',
            fontSize: 12,
          },
        }}
      >
        <Tab.Screen 
          name="Cafe" 
          component={GameScreen}
          options={{
            tabBarLabel: 'Café',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Text style={{ color, fontSize: size }}>☕</Text>
            ),
          }}
        />
        <Tab.Screen 
          name="Trading" 
          component={TradingScreen}
          options={{
            tabBarLabel: 'Trading',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Text style={{ color, fontSize: size }}>📈</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}; 