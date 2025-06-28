import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { MenuScreen } from '../screens/MenuScreen';
import { OrdersScreen } from '../screens/OrdersScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { colors } from '../constants/colors';
import { strings } from '../constants/strings';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (name: string, focused: boolean) => (
  <Ionicons
    name={name as any}
    size={24}
    color={focused ? colors.cosmic.primary : colors.text.secondary}
  />
);

export const CosmicNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.backgrounds.main,
            borderBottomColor: colors.backgrounds.card,
            borderBottomWidth: 1,
          },
          headerTintColor: colors.text.primary,
          tabBarStyle: {
            backgroundColor: colors.backgrounds.main,
            borderTopColor: colors.backgrounds.card,
            borderTopWidth: 1,
            paddingBottom: 8,
            paddingTop: 8,
            height: 60,
          },
          tabBarActiveTintColor: colors.cosmic.primary,
          tabBarInactiveTintColor: colors.text.secondary,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: strings.navigation.home,
            tabBarIcon: ({ focused }) => getTabBarIcon('home', focused),
          }}
        />
        <Tab.Screen
          name="Menu"
          component={MenuScreen}
          options={{
            title: strings.navigation.menu,
            tabBarIcon: ({ focused }) => getTabBarIcon('cafe', focused),
          }}
        />
        <Tab.Screen
          name="Orders"
          component={OrdersScreen}
          options={{
            title: strings.navigation.orders,
            tabBarIcon: ({ focused }) => getTabBarIcon('list', focused),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: strings.navigation.profile,
            tabBarIcon: ({ focused }) => getTabBarIcon('person', focused),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}; 