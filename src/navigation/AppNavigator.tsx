import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameScreen } from '../screens/GameScreen';
import { colors } from '../constants/colors';
import { strings } from '../constants/strings';

const Stack = createNativeStackNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Game"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.backgrounds.main,
          },
        }}
      >
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 