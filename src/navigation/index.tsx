import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { EventDashboard } from '../screens';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './EventDetailsNavigator';

interface Props {
  colorScheme: ColorSchemeName;
}

export default function Navigation({ colorScheme }: Props) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EventDashboard" component={EventDashboard} />
    </Stack.Navigator>
  );
}
